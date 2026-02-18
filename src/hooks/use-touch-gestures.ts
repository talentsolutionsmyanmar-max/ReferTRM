'use client';

import { useCallback, useRef, useState } from 'react';

export interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export interface SwipeState {
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
  velocity: number;
}

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

const SWIPE_THRESHOLD = 50; // Minimum distance for swipe
const VELOCITY_THRESHOLD = 0.3; // Minimum velocity

export function useSwipe(handlers: SwipeHandlers, options?: { 
  threshold?: number;
  preventScrollOnSwipe?: boolean;
}) {
  const threshold = options?.threshold || SWIPE_THRESHOLD;
  const preventScrollOnSwipe = options?.preventScrollOnSwipe ?? true;
  
  const startPoint = useRef<TouchPoint | null>(null);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    direction: null,
    distance: 0,
    velocity: 0,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPoint.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };
    setSwipeState({ direction: null, distance: 0, velocity: 0 });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!startPoint.current) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPoint.current.x;
    const deltaY = touch.clientY - startPoint.current.y;
    
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    // Determine primary direction
    if (absX > absY) {
      setSwipeState({
        direction: deltaX > 0 ? 'right' : 'left',
        distance: absX,
        velocity: absX / (Date.now() - startPoint.current.timestamp),
      });
      
      // Prevent horizontal scroll during swipe
      if (preventScrollOnSwipe && absX > 10) {
        e.preventDefault();
      }
    } else {
      setSwipeState({
        direction: deltaY > 0 ? 'down' : 'up',
        distance: absY,
        velocity: absY / (Date.now() - startPoint.current.timestamp),
      });
    }
  }, [preventScrollOnSwipe]);

  const handleTouchEnd = useCallback(() => {
    if (!startPoint.current) return;
    
    const { direction, distance, velocity } = swipeState;
    
    // Check if swipe meets threshold
    if (distance >= threshold || velocity >= VELOCITY_THRESHOLD) {
      switch (direction) {
        case 'left':
          handlers.onSwipeLeft?.();
          break;
        case 'right':
          handlers.onSwipeRight?.();
          break;
        case 'up':
          handlers.onSwipeUp?.();
          break;
        case 'down':
          handlers.onSwipeDown?.();
          break;
      }
    }
    
    startPoint.current = null;
    setSwipeState({ direction: null, distance: 0, velocity: 0 });
  }, [swipeState, threshold, handlers]);

  return {
    swipeState,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}

// Hook for tab navigation with swipe
export function useSwipeNavigation(tabs: string[], options?: {
  initialIndex?: number;
  onChange?: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(options?.initialIndex || 0);
  
  const goToNext = useCallback(() => {
    setActiveIndex(prev => {
      const next = Math.min(prev + 1, tabs.length - 1);
      options?.onChange?.(next);
      return next;
    });
  }, [tabs.length, options]);
  
  const goToPrevious = useCallback(() => {
    setActiveIndex(prev => {
      const next = Math.max(prev - 1, 0);
      options?.onChange?.(next);
      return next;
    });
  }, [options]);
  
  const goToTab = useCallback((index: number) => {
    if (index >= 0 && index < tabs.length) {
      setActiveIndex(index);
      options?.onChange?.(index);
    }
  }, [tabs.length, options]);
  
  const { handlers: swipeHandlers } = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
  });
  
  return {
    activeIndex,
    activeTab: tabs[activeIndex],
    goToNext,
    goToPrevious,
    goToTab,
    swipeHandlers,
  };
}

// Hook for long press (context menu alternative)
export function useLongPress(
  callback: () => void, 
  options?: { delay?: number }
) {
  const delay = options?.delay || 500;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const start = useCallback(() => {
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      callback();
      setIsPressed(false);
    }, delay);
  }, [callback, delay]);

  const stop = useCallback(() => {
    setIsPressed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    isPressed,
    handlers: {
      onTouchStart: start,
      onTouchEnd: stop,
      onTouchCancel: stop,
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
    },
  };
}

// Hook for double tap
export function useDoubleTap(
  callback: () => void,
  options?: { delay?: number }
) {
  const delay = options?.delay || 300;
  const lastTapRef = useRef<number>(0);

  const handleTap = useCallback(() => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < delay) {
      callback();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, [callback, delay]);

  return {
    onTap: handleTap,
  };
}

// Hook for pinch to zoom
export function usePinchZoom(
  callback: (scale: number) => void,
  options?: { minScale?: number; maxScale?: number }
) {
  const minScale = options?.minScale || 0.5;
  const maxScale = options?.maxScale || 3;
  const initialDistanceRef = useRef<number>(0);
  const [scale, setScale] = useState(1);

  const getDistance = (touches: React.TouchList): number => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      initialDistanceRef.current = getDistance(e.touches);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistanceRef.current > 0) {
      e.preventDefault();
      
      const currentDistance = getDistance(e.touches);
      const newScale = currentDistance / initialDistanceRef.current;
      const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));
      
      setScale(clampedScale);
      callback(clampedScale);
    }
  }, [callback, minScale, maxScale]);

  const handleTouchEnd = useCallback(() => {
    initialDistanceRef.current = 0;
  }, []);

  return {
    scale,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}

// Hook for mobile haptic feedback (vibration)
export function useHapticFeedback() {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const light = useCallback(() => vibrate(10), [vibrate]);
  const medium = useCallback(() => vibrate(20), [vibrate]);
  const heavy = useCallback(() => vibrate(30), [vibrate]);
  const success = useCallback(() => vibrate([10, 50, 10]), [vibrate]);
  const error = useCallback(() => vibrate([30, 50, 30]), [vibrate]);

  return {
    vibrate,
    light,
    medium,
    heavy,
    success,
    error,
    isSupported: typeof navigator !== 'undefined' && 'vibrate' in navigator,
  };
}
