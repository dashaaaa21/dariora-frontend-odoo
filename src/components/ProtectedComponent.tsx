import { ReactNode } from 'react';
import { Permission } from '@/lib/permission';
import { usePermission } from '@/hooks/usePermission';

interface ProtectedComponentProps {
  children: ReactNode;
  permission: Permission | Permission[];
  fallback?: ReactNode;
  requireAll?: boolean;
}

/**
 * Component wrapper for permission-based rendering
 */
export default function ProtectedComponent({
  children,
  permission,
  fallback = null,
  requireAll = false,
}: ProtectedComponentProps) {
  const { canAll, canAny } = usePermission();

  const permissions = Array.isArray(permission) ? permission : [permission];
  const hasPermission = requireAll ? canAll(permissions) : canAny(permissions);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
