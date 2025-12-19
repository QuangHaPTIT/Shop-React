import type { SelectOption } from './Select.type';

export interface PageSizeSelectProps {
  pageSizes?: SelectOption[];
  pageSize?: number;
  disabled?: boolean;
  onChange?: (pageSize: number) => void;
  className?: string;
}

