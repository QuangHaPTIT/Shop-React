export type TagSize = 'small' | 'normal' | 'large';
export type TagRadius = 'small' | 'middle' | 'large';
export type TagColor =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'gray'
  | 'dark'
  | string; // For custom hex colors

export interface TagProps {
  size?: TagSize;
  radius?: TagRadius;
  color?: TagColor;
  iconLeft?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

