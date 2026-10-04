/**
 * Utility function to combine classNames conditionally
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Common Tailwind class combinations
 */
export const commonClasses = {
  // Layout
  container: 'mx-auto max-w-[1360px] px-10',
  section: 'relative border-t border-white/10 px-10 py-[120px] transition-all duration-700',
  
  // Glass morphism
  glass: 'glass p-8 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300',
  glassLarge: 'glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300',
  
  // Text
  techLabel: 'tech-label text-[var(--steel-gray)]',
  techLabelRed: 'tech-label text-[var(--neon-red)]',
  bodyText: 'body-text text-[var(--steel-gray)]',
  
  // Links
  navLink: 'group relative text-[12px] uppercase tracking-[0.08em] text-[var(--steel-gray)] transition-colors duration-300 hover:text-[var(--pure-white)]',
  navUnderline: 'absolute -bottom-2 left-0 h-px w-0 bg-[var(--neon-red)] transition-all duration-300 group-hover:w-full',
} as const;
