export type DatePickerMode = 'day' | 'month' | 'year';
export type DatePickerPosition = 'left' | 'center' | 'right';

export interface DatePickerProps {
  value?: Date | null;
  mode?: DatePickerMode;
  position?: DatePickerPosition;
  onChange?: (value: Date | null) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  dateFormat?: string;
  locale?: string;
}

