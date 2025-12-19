import React from 'react';
import type { GrantedProps } from './Granted.type';
import { usePermissions } from '../../hooks/usePermissions';

const Granted: React.FC<GrantedProps> = ({ roles, children }) => {
  const { hasRole } = usePermissions();
  const permitted = hasRole(...roles);

  if (!permitted) {
    return null;
  }

  return <>{children}</>;
};

export default Granted;

