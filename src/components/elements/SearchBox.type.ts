export interface SearchBoxOption {
  [key: string]: any;
}

export interface SearchBoxProps {
  value?: any[] | any;
  options: SearchBoxOption[];
  labelKey?: string;
  trackByKey?: string;
  multiple?: boolean;
  searchable?: boolean;
  closeOnSelect?: boolean;
  clearOnSelect?: boolean;
  preserveSearch?: boolean;
  placeholder?: string;
  labelText?: string;
  loading?: boolean;
  allowCreate?: boolean;
  validateTag?: (text: string) => boolean;
  onChange?: (value: any[] | any) => void;
  onSearchChange?: (query: string) => void;
  onOpen?: () => void;
  renderOption?: (option: SearchBoxOption) => React.ReactNode;
  className?: string;
}

