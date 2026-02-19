// ReferTRM Design System Utilities
// Gender-neutral avatars with initials only (like Notion/Linear)

/**
 * Get initials from name for avatar display
 * Design System Rule: Gender-neutral avatars — initials only
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return 'GU';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

/**
 * Level icons using Lucide React (Design System: NO emojis)
 * Amateur: Sprout (🌱 equivalent)
 * Professional: Briefcase (💼 equivalent)
 * Expert: Star (⭐ equivalent)
 * Master: Crown (👑 equivalent)
 */
export const levelIcons = {
  Amateur: 'Sprout',
  Professional: 'Briefcase',
  Expert: 'Star',
  Master: 'Crown',
} as const;

/**
 * Level colors matching design system
 */
export const levelColors: Record<string, string> = {
  Amateur: 'text-green-400',
  Professional: 'text-blue-400',
  Expert: 'text-purple-400',
  Master: 'text-amber-400',
};

/**
 * Tier colors from Design System
 */
export const tierColors: Record<string, string> = {
  Bronze: 'bg-amber-900/20 text-amber-600 border-amber-700/30',
  Silver: 'bg-slate-700/20 text-slate-400 border-slate-600/30',
  Gold: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  Diamond: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  Legendary: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
};
