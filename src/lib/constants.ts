// Color palette
export const COLORS = {
  obsidianBlack: '#050505',
  deepCharcoal: '#0D0D0F',
  neonRed: '#FF1A0A',
  electricOrange: '#FF4B16',
  pureWhite: '#F5F5F5',
  steelGray: '#777777',
} as const;

// Navigation items
export const NAV_ITEMS = [
  { label: 'Courses', href: '/courses' },
  { label: 'Learn', href: '/learn' },
  { label: 'AI Tools', href: '/ai-tools' },
  { label: 'About', href: '/about' },
] as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  base: 300,
  slow: 500,
} as const;
