export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

export interface InputProps {
  name: string;
  type?: string;
  autocomplete?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyup?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeydown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeypress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputComponentProps {
  label?: string;
  inputProps: InputProps;
  showPasswordToggle?: boolean;
  size?: InputSize;
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
  adornmentStart?: React.ReactNode;
  adornmentEnd?: React.ReactNode;
}

