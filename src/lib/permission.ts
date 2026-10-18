/**
 * Permission and authorization utilities
 */

export enum Permission {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  ADMIN = 'admin',
}

export enum Role {
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  STUDENT = 'student',
  GUEST = 'guest',
}

export const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [Permission.READ, Permission.CREATE, Permission.UPDATE, Permission.DELETE, Permission.ADMIN],
  [Role.INSTRUCTOR]: [Permission.READ, Permission.CREATE, Permission.UPDATE],
  [Role.STUDENT]: [Permission.READ],
  [Role.GUEST]: [],
};

export class PermissionManager {
  private userRole: Role = Role.GUEST;

  setRole(role: Role): void {
    this.userRole = role;
  }

  getRole(): Role {
    return this.userRole;
  }

  hasPermission(permission: Permission): boolean {
    const permissions = rolePermissions[this.userRole];
    return permissions.includes(permission);
  }

  hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some((permission) => this.hasPermission(permission));
  }

  hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every((permission) => this.hasPermission(permission));
  }

  can(permission: Permission): boolean {
    return this.hasPermission(permission);
  }

  cannot(permission: Permission): boolean {
    return !this.hasPermission(permission);
  }
}

export const permissionManager = new PermissionManager();
