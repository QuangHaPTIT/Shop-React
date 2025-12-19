import React from 'react';
import type { SortSelectProps } from './SortSelect.type';
import Select from './Select';
import SortIcon from '../icons/SortIcon';

const SortSelect: React.FC<SortSelectProps> = ({
  sortOptions = [],
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-end md:justify-between gap-y-4 gap-x-2 ${className || ''}`}
    >
      <label className="text-sm text-gray-700 w-auto flex items-center gap-1 shrink-0 whitespace-nowrap">
        <span className="shrink-0">
          <SortIcon />
        </span>
        <span className="shrink-0">Sort:</span>
      </label>
      <Select
        options={sortOptions}
        value={value}
        onChange={(val) => onChange?.(String(val))}
        className="rounded border border-gray-300 text-sm py-1 px-2"
      />
    </div>
  );
};

export default SortSelect;

