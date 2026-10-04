import Link from "next/link";
import { commonClasses } from "@/lib/classNames";

interface NavLinkProps {
  href: string;
  label: string;
  isExternal?: boolean;
}

export default function NavLink({ href, label, isExternal }: NavLinkProps) {
  const Component = isExternal ? "a" : Link;
  
  return (
    <Component
      href={href}
      className={commonClasses.navLink}
    >
      {label}
      <span className={commonClasses.navUnderline} />
    </Component>
  );
}
