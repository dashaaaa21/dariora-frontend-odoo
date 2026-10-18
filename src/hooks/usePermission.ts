import { useState, useEffect } from 'react';
import { permissionManager, Permission, Role } from '@/lib/permission';

/**
 * Hook to check permissions
 */
export function usePermission() {
  const [userRole, setUserRole] = useState<Role>(permissionManager.getRole());

  useEffect(() => {
    // Subscribe to role changes
    // This could be connected to auth store
  }, []);

  const can = (permission: Permission): boolean => {
    return permissionManager.hasPermission(permission);
  };

  const cannot = (permission: Permission): boolean => {
    return !permissionManager.hasPermission(permission);
  };

  const canAny = (permissions: Permission[]): boolean => {
    return permissionManager.hasAnyPermission(permissions);
  };

  const canAll = (permissions: Permission[]): boolean => {
    return permissionManager.hasAllPermissions(permissions);
  };

  return { can, cannot, canAny, canAll, userRole };
}
