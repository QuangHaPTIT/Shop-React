export interface RadioProps {
  name: string;
  value: string | number | boolean;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface RadioComponentProps {
  radioProps: RadioProps;
  label?: string;
  value?: string | number | boolean;
  onChange?: (value: string | number | boolean) => void;
  children?: React.ReactNode;
}

