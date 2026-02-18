'use client';

import { useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import { RefreshCw, Check } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  language?: 'en' | 'my';
}

interface TouchState {
  startY: number;
  currentY: number;
  isPulling: boolean;
}

const PULL_THRESHOLD = 80; // Distance needed to trigger refresh
const MAX_PULL = 120; // Maximum pull distance

export default function PullToRefresh({ 
  onRefresh, 
  children, 
  language = 'en' 
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshComplete, setRefreshComplete] = useState(false);
  
  const touchState = useRef<TouchState>({
    startY: 0,
    currentY: 0,
    isPulling: false,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isAtTop = useRef(true);

  // Check if scrolled to top
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        isAtTop.current = containerRef.current.scrollTop <= 0;
      }
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isAtTop.current || isRefreshing) return;
    
    touchState.current = {
      startY: e.touches[0].clientY,
      currentY: e.touches[0].clientY,
      isPulling: true,
    };
  }, [isRefreshing]);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchState.current.isPulling || !isAtTop.current || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchState.current.startY;
    
    if (diff > 0) {
      // Prevent default scroll when pulling down
      e.preventDefault();
      
      // Apply resistance
      const distance = Math.min(diff * 0.5, MAX_PULL);
      setPullDistance(distance);
      touchState.current.currentY = currentY;
    }
  }, [isRefreshing]);

  // Handle touch end
  const handleTouchEnd = useCallback(async () => {
    if (!touchState.current.isPulling || isRefreshing) {
      setPullDistance(0);
      return;
    }
    
    touchState.current.isPulling = false;
    
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(PULL_THRESHOLD);
      
      try {
        await onRefresh();
        setRefreshComplete(true);
        
        // Show success briefly
        setTimeout(() => {
          setRefreshComplete(false);
          setPullDistance(0);
        }, 800);
      } catch (error) {
        console.error('Refresh failed:', error);
        setPullDistance(0);
      } finally {
        setIsRefreshing(false);
      }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, isRefreshing, onRefresh]);

  // Calculate progress
  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const iconRotation = progress * 360;

  // Don't render on non-touch devices
  if (typeof window !== 'undefined' && !('ontouchstart' in window)) {
    return <>{children}</>;
  }

  const texts = {
    pullDown: language === 'my' ? 'ဆွဲချ၍ အသစ်ပြုလုပ်ပါ' : 'Pull down to refresh',
    release: language === 'my' ? 'လွှတ်၍ အသစ်ပြုလုပ်ပါ' : 'Release to refresh',
    refreshing: language === 'my' ? 'အသစ်ပြုလုပ်နေသည်...' : 'Refreshing...',
    complete: language === 'my' ? 'ပြီးပါပြီ!' : 'Updated!',
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div 
        className="absolute left-0 right-0 flex items-center justify-center overflow-hidden transition-all z-50"
        style={{
          top: 0,
          height: pullDistance,
          opacity: pullDistance > 0 ? 1 : 0,
        }}
      >
        <div className="flex flex-col items-center gap-1 text-slate-500">
          {refreshComplete ? (
            <>
              <Check className="w-6 h-6 text-teal-500" />
              <span className="text-xs">{texts.complete}</span>
            </>
          ) : isRefreshing ? (
            <>
              <RefreshCw className="w-6 h-6 text-teal-500 animate-spin" />
              <span className="text-xs">{texts.refreshing}</span>
            </>
          ) : (
            <>
              <RefreshCw 
                className="w-6 h-6 text-teal-500 transition-transform"
                style={{ 
                  transform: `rotate(${iconRotation}deg)`,
                  opacity: 0.3 + (progress * 0.7),
                }}
              />
              <span className="text-xs">
                {progress >= 1 ? texts.release : texts.pullDown}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div 
        className="transition-transform"
        style={{
          transform: `translateY(${pullDistance}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Simpler hook version for programmatic refresh
export function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, onRefresh]);

  return { isRefreshing, refresh };
}
