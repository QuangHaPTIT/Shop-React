export const RoleValues = {
  USER: 'USER',
  MANAGER: 'MANAGER',
  ADMINISTRATOR: 'ADMINISTRATOR',
} as const;

export type Role = (typeof RoleValues)[keyof typeof RoleValues];

export interface User {
  id?: string;
  name?: string;
  email?: string;
  roles?: Role[];
}
