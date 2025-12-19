import { useMemo } from 'react';
import { rolePermissions } from '../constants/permissions';
import type { Permission } from '../constants/permissions';
import type { Role } from '../types/user';
import { useAuthStore } from '../stores/authStore';

export const usePermissions = () => {
  const authStore = useAuthStore();
  
  const currentRoles = useMemo(() => authStore.user?.roles || [], [authStore.user?.roles]);

  const hasPermission = (permission: Permission): boolean => {
    return Object.entries(rolePermissions).some(([role, rolePerms]) => {
      return (
        currentRoles.includes(role as Role) &&
        rolePerms.includes(permission)
      );
    });
  };

  const hasRole = (...roles: Role[]): boolean => {
    return roles.some((role) => currentRoles.includes(role));
  };

  return {
    hasPermission,
    hasRole,
    roles: authStore.user?.roles || [],
  };
};
