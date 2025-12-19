import React, { useState, useEffect } from 'react';
import type { DatePickerProps } from './DatePicker.type';

const DatePicker: React.FC<DatePickerProps> = ({
  value = null,
  mode = 'day',
  position = 'left',
  onChange,
  className,
  disabled = false,
  placeholder,
  locale = 'ja',
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);

  useEffect(() => {
    setSelectedDate(value);
  }, [value, mode, locale]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value ? new Date(event.target.value) : null;
    setSelectedDate(newDate);
    
    if (onChange) {
      onChange(newDate);
    }
  };

  // Get input type based on mode
  const getInputType = (): string => {
    switch (mode) {
      case 'month':
        return 'month';
      case 'year':
        return 'number'; // HTML5 doesn't have year input, use number
      default:
        return 'date';
    }
  };

  // Get min/max for year input
  const getYearValue = (): number | undefined => {
    if (mode === 'year' && selectedDate) {
      return selectedDate.getFullYear();
    }
    return undefined;
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value);
    if (!isNaN(year)) {
      const newDate = new Date(year, 0, 1);
      setSelectedDate(newDate);
      
      if (onChange) {
        onChange(newDate);
      }
    } else {
      setSelectedDate(null);
      
      if (onChange) {
        onChange(null);
      }
    }
  };

  // Get date string for date/month inputs
  const getDateValue = (): string => {
    if (!selectedDate) return '';
    
    if (mode === 'month') {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}`;
    }
    
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const positionClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const inputClasses = [
    'px-4',
    'py-2',
    'w-[116px]',
    'text-center',
    'border',
    'border-gray-300',
    'rounded-md',
    'outline-none',
    'transition-all',
    'focus:border-blue-500',
    'focus:shadow-[0_0_0_2px_rgba(59,130,246,0.25)]',
    disabled ? 'opacity-60 cursor-not-allowed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`flex ${positionClasses[position]} ${className || ''}`}>
      {mode === 'year' ? (
        <input
          type="number"
          value={getYearValue() || ''}
          onChange={handleYearChange}
          disabled={disabled}
          placeholder={placeholder || 'YYYY'}
          min="1900"
          max="2100"
          className={inputClasses}
        />
      ) : (
        <input
          type={getInputType()}
          value={getDateValue()}
          onChange={handleDateChange}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
};

export default DatePicker;

