export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  disabled?: boolean;
  className?: string;
  width?: string;
  placeholder?: string;
  onChange?: (value: string | number) => void;
  name?: string;
  id?: string;
}

