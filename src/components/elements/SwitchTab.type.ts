export interface SwitchTabOption {
  value: string | number;
  label: string;
  translationKey?: string;
}

export interface SwitchTabProps {
  options: SwitchTabOption[];
  value?: string | number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  block?: boolean;
  onChange?: (value: string | number) => void;
  className?: string;
}

