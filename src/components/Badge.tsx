import { ReactNode } from 'react';
import { cn } from '@/lib/classNames';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-[var(--neon-red)]/10 text-[var(--neon-red)]',
    success: 'bg-green-500/10 text-green-400',
    danger: 'bg-red-500/10 text-red-400',
    warning: 'bg-yellow-500/10 text-yellow-400',
  };

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
