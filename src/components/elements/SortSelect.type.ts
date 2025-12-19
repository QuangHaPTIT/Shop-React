import type { SelectOption } from './Select.type';

export interface SortSelectProps {
  sortOptions?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

