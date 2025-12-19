import React from 'react';
import type { RadioComponentProps } from './Radio.type';

const Radio: React.FC<RadioComponentProps> = ({
  radioProps,
  label,
  value,
  onChange,
  children,
}) => {
  const inputId =
    radioProps.id || `${radioProps.name}-${String(radioProps.value)}`;
  const isDisabled = radioProps.disabled ?? false;
  const isChecked = value === radioProps.value;
  const showLabel = children || label;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(radioProps.value);
    }
    if (radioProps.onChange) {
      radioProps.onChange(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (radioProps.onBlur) {
      radioProps.onBlur(event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (radioProps.onFocus) {
      radioProps.onFocus(event);
    }
  };

  return (
    <div className="flex items-start gap-2">
      <div
        className={`relative flex items-center ${
          isDisabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <input
          type="radio"
          checked={isChecked}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          id={inputId}
          name={radioProps.name}
          value={String(radioProps.value)}
          disabled={isDisabled}
          required={radioProps.required ?? false}
          className={[
            'appearance-none w-5 h-5 rounded-full border border-gray-300 outline-none checked:border-primary',
            'checked:bg-white',
            'focus:border-primary-blue focus:shadow-[0_0_0_2px_rgba(13,110,253,0.25)] transition-all',
            'relative cursor-pointer',
            radioProps.className || '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {/* Custom radio dot */}
        {isChecked && (
          <div
            className={`absolute pointer-events-none left-0 top-0 w-5 h-5 flex items-center justify-center ${
              isDisabled ? 'opacity-60' : ''
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
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

export default Radio;

