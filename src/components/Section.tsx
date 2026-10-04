import { ReactNode } from "react";
import { cn } from "@/lib/classNames";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
  minHeight?: string;
}

export default function Section({
  id,
  children,
  className,
  withBorder = true,
  minHeight = "auto",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-10 py-[120px] transition-all duration-700",
        withBorder && "border-t border-white/10",
        className
      )}
      style={{ minHeight }}
    >
      {children}
    </section>
  );
}
