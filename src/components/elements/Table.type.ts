export interface MergeCellConfig {
  beginCell: { row: number; column: number };
  endCell: { row: number; column: number };
}

export interface Column {
  key: string;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  ellipsis?: boolean;
  compute?: (value: any) => any;
  onEmpty?: 'blank' | 'dash' | 'zero';
  colspan?: number;
  rowSpan?: number;
  getColspan?: (row: any, column: Column, rowIndex: number) => number;
  getRowSpan?: (row: any, column: Column, rowIndex: number) => number;
}

export interface SortState {
  key: string | null;
  order: 'asc' | 'desc' | null;
}

export interface TableProps {
  columns: Column[];
  data?: any[];
  loading?: boolean;
  bordered?: 'horizontal' | 'vertical' | 'all' | false;
  outlined?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  rowClickable?: boolean;
  size?: 'small' | 'middle' | 'large';
  noHeader?: boolean;
  maxHeight?: number | string;
  theadClass?: string;
  tfootClass?: string;
  mergeCells?: MergeCellConfig[];
  searchNoDataFlag?: boolean;
  searchNoDataText?: string;
  noDataText?: string;
  sortState?: SortState;
  getRowKey?: (row: any, index: number) => string | number;
  getRowClass?: (row: any, index: number) => string | string[];
  getCellClass?: (row: any, column: Column, index: number) => string | string[];
  getHeaderClass?: (column: Column, index: number) => string | string[];
  onRowClick?: (data: { row: any; index: number }) => void;
  onRowDblClick?: (data: { row: any; index: number }) => void;
  onCellClick?: (data: { row: any; column: Column; index: number }) => void;
  onHeaderClick?: (data: { column: Column; index: number }) => void;
  onSortChange?: (sortState: SortState) => void;
  className?: string;
  children?: React.ReactNode;
  renderHeader?: (column: Column, index: number) => React.ReactNode;
  renderCell?: (row: any, column: Column, rowIndex: number) => React.ReactNode;
  renderNoData?: () => React.ReactNode;
  renderSearchNoData?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
}

