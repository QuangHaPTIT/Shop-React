export interface PaginationProps {
  page?: number;
  total?: number;
  maxVisibleButtons?: number;
  showNavButtons?: boolean;
  showPageSize?: boolean;
  showDescription?: boolean;
  pageSizes?: number[];
  pageSize?: number;
  disabled?: boolean;
  compact?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  className?: string;
}

