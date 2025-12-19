import React, { useEffect, useRef } from 'react';
import type { CheckboxComponentProps } from './Checkbox.type';
import CheckIcon from '../icons/CheckIcon';

const Checkbox: React.FC<CheckboxComponentProps> = ({
  checkboxProps,
  label,
  value = false,
  onChange,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Set indeterminate state if provided
  useEffect(() => {
    if (inputRef.current && checkboxProps.indeterminate) {
      inputRef.current.indeterminate = true;
    } else if (inputRef.current) {
      inputRef.current.indeterminate = false;
    }
  }, [checkboxProps.indeterminate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
    if (checkboxProps.onChange) {
      checkboxProps.onChange(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (checkboxProps.onBlur) {
      checkboxProps.onBlur(event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (checkboxProps.onFocus) {
      checkboxProps.onFocus(event);
    }
  };

  const inputId = checkboxProps.id || checkboxProps.name;
  const isDisabled = checkboxProps.disabled ?? false;
  const showLabel = children || label;

  return (
    <div className="flex items-start gap-2">
      <div
        className={`relative flex items-center ${
          isDisabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <input
          ref={inputRef}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          id={inputId}
          name={checkboxProps.name}
          disabled={isDisabled}
          required={checkboxProps.required ?? false}
          className={[
            'appearance-none w-5 h-5 rounded border border-gray-300 outline-none checked:border-primary',
            'checked:bg-primary checked:border-primary',
            'focus:border-primary-blue focus:shadow-[0_0_0_2px_rgba(13,110,253,0.25)] transition-all',
            'relative cursor-pointer',
            checkboxProps.className || '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {/* Custom checkbox icon */}
        {value && (
          <div
            className={`absolute pointer-events-none left-0 top-0 w-5 h-5 flex items-center justify-center text-white ${
              isDisabled ? 'opacity-60' : ''
            }`}
          >
            <CheckIcon className="absolute inset-0 m-auto" />
          </div>
        )}
      </div>

      {showLabel && (
        <label
          htmlFor={inputId}
          className={`text-sm cursor-pointer ${
            isDisabled ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {children || label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;

