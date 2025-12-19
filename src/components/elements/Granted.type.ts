import type { Role } from '../../types/user';

export interface GrantedProps {
  roles: Role[];
  children?: React.ReactNode;
}

