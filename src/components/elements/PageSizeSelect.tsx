import React from 'react';
import type { PageSizeSelectProps } from './PageSizeSelect.type';
import Select from './Select';
import type { SelectOption } from './Select.type';

const defaultPageSizes: SelectOption[] = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({
  pageSizes = defaultPageSizes,
  pageSize = 10,
  disabled = false,
  onChange,
  className,
}) => {
  const handlePageSizeChange = (value: string | number) => {
    if (disabled) return;
    
    const newPageSize = Number(value);
    if (onChange) {
      onChange(newPageSize);
    }
  };

  return (
    <div className={`hidden md:flex md:flex-wrap items-center gap-x-2 ${className || ''}`}>
      <label htmlFor="page-size" className="text-sm text-gray-700">
        Page size:
      </label>

      <Select
        id="page-size"
        options={pageSizes}
        value={pageSize}
        disabled={disabled}
        onChange={handlePageSizeChange}
        className="rounded border border-gray-300 text-sm py-1 px-2"
        width="w-18"
      />
    </div>
  );
};

export default PageSizeSelect;

