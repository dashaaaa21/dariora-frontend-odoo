import { ReactNode } from 'react';
import { cn } from '@/lib/classNames';

interface CardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  hover?: boolean;
}

export default function Card({
  children,
  className,
  clickable = false,
  hover = true,
}: CardProps) {
  return (
    <div
      className={cn(
        'glass p-8 rounded-lg transition-all duration-300',
        hover && 'group hover:bg-[var(--deep-charcoal)]/80',
        clickable && 'cursor-pointer hover:scale-105 transform',
        className
      )}
    >
      {children}
    </div>
  );
}
