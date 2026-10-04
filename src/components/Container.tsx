import { ReactNode } from "react";
import { cn } from "@/lib/classNames";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-[1360px] relative z-10", className)}>
      {children}
    </div>
  );
}
