import { RoleValues, type Role } from '../types/user';

export const permissions = {
  DASHBOARD: 'DASHBOARD',
  PRODUCTS: 'PRODUCTS',
  ORDERS: 'ORDERS',
  USERS: 'USERS',
  PAYMENTS: 'PAYMENTS',
  REPORTS: 'REPORTS',
} as const;

export type Permission = (typeof permissions)[keyof typeof permissions];

export const rolePermissions: Record<Role, Permission[]> = {
  [RoleValues.USER]: [
    permissions.DASHBOARD,
    permissions.PRODUCTS,
    permissions.PAYMENTS,
    permissions.USERS,
    permissions.ORDERS,
  ],
  [RoleValues.MANAGER]: [
    permissions.DASHBOARD,
    permissions.PRODUCTS,
    permissions.PAYMENTS,
    permissions.USERS,
    permissions.ORDERS,
    permissions.REPORTS
  ],
  [RoleValues.ADMINISTRATOR]: [
    permissions.DASHBOARD,
    permissions.PRODUCTS,
    permissions.PAYMENTS,
    permissions.USERS,
    permissions.ORDERS,
    permissions.REPORTS
  ],
};

