import React from 'react';
import type { SelectProps } from './Select.type';

const Select: React.FC<SelectProps> = ({
  options,
  value,
  disabled = false,
  className = '',
  width = 'w-full',
  placeholder,
  onChange,
  name,
  id,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const option = options.find((opt) => String(opt.value) === selectedValue);
    
    if (onChange && option) {
      onChange(option.value);
    }
  };

  const selectValue = value !== undefined ? String(value) : '';

  return (
    <select
      id={id}
      name={name}
      value={selectValue}
      onChange={handleChange}
      disabled={disabled}
      className={`${width} ${className}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={index} value={String(option.value)}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

