export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonVariant = 'filled' | 'outline' | 'text';

export type ButtonColor = 'primary' | 'danger' | 'secondary' | 'success';

export interface ButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  size?: ButtonSize;
  iconOnly?: boolean;
  customClass?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

