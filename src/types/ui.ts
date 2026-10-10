/**
 * UI Component Types and Interfaces
 */

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface StatCard {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ValueCard {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ToolCategory {
  name: string;
  tools: string;
  description: string;
}

export interface CourseFilters {
  searchQuery: string;
  showOnlyPublished: boolean;
}
