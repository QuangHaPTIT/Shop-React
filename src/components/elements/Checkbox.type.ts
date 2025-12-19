export interface CheckboxProps {
  name: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  indeterminate?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface CheckboxComponentProps {
  checkboxProps: CheckboxProps;
  label?: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

