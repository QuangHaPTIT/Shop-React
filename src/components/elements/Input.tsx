import React, { useState, useMemo } from 'react';
import type { InputComponentProps } from './Input.type';
import Label from './Label';
import EyeIcon from '../icons/EyeIcon';
import EyeOffIcon from '../icons/EyeOffIcon';

const Input: React.FC<InputComponentProps> = ({
  label,
  inputProps,
  showPasswordToggle = false,
  size = 'md',
  value = '',
  onChange,
  adornmentStart,
  adornmentEnd,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const computedType = useMemo(() => {
    if (inputProps.type === 'password' && isPasswordVisible) {
      return 'text';
    }
    return inputProps.type ?? 'text';
  }, [inputProps.type, isPasswordVisible]);

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-4 py-2.5 text-base';
      case 'xl':
        return 'px-5 py-3 text-lg';
      default:
        return 'px-3 py-2 text-sm';
    }
  }, [size]);

  const paddingLeftClasses = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'pl-2';
      case 'md':
        return 'pl-3';
      case 'lg':
        return 'pl-4';
      case 'xl':
        return 'pl-5';
      default:
        return 'pl-3';
    }
  }, [size]);

  const paddingRightClasses = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'pr-2';
      case 'md':
        return 'pr-3';
      case 'lg':
        return 'pr-4';
      case 'xl':
        return 'pr-5';
      default:
        return 'pr-3';
    }
  }, [size]);

  const iconSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 16;
      case 'xl':
        return 24;
      default:
        return 20;
    }
  }, [size]);

  const labelSizeClass = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'xl':
        return 'text-lg';
      default:
        return '';
    }
  }, [size]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    if (inputProps.onChange) {
      inputProps.onChange(event);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    if (inputProps.onInput) {
      inputProps.onInput(event);
    }
  };

  const hasAdornmentStart = !!adornmentStart;
  const hasAdornmentEnd = !!adornmentEnd || (showPasswordToggle && inputProps.type === 'password');

  return (
    <div className="flex flex-col gap-1 h-full">
      {label && (
        <Label className={labelSizeClass}>{label}</Label>
      )}
      <div
        className={`relative flex items-center w-full h-full ${
          inputProps.disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {/* Prefix/Leading adornment */}
        {adornmentStart && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${paddingLeftClasses}`}
          >
            {adornmentStart}
          </div>
        )}

        <input
          {...inputProps}
          type={computedType}
          value={value}
          onChange={handleChange}
          onBlur={inputProps.onBlur}
          onFocus={inputProps.onFocus}
          onKeyUp={inputProps.onKeyup}
          onKeyDown={inputProps.onKeydown}
          onKeyPress={inputProps.onKeypress}
          onInput={handleInput}
          placeholder={inputProps.placeholder ?? ''}
          required={inputProps.required ?? false}
          disabled={inputProps.disabled ?? false}
          readOnly={inputProps.readonly ?? false}
          autoComplete={inputProps.autocomplete ?? 'off'}
          name={inputProps.name}
          className={[
            inputProps.className || '',
            'w-full h-full border border-gray-300 rounded outline-none focus:border-primary-blue focus:shadow-[0_0_0_2px_rgba(13,110,253,0.25)] transition-all',
            'disabled:bg-gray-100 disabled:pointer-events-none',
            sizeClasses,
            hasAdornmentStart ? 'pl-10' : '',
            hasAdornmentEnd ? 'pr-10' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            msReveal: 'none',
            msClear: 'none',
          } as React.CSSProperties}
        />

        {/* Password toggle icon */}
        {showPasswordToggle && inputProps.type === 'password' && (
          <div
            className={`absolute inset-y-0 right-0 flex items-center cursor-pointer ${paddingRightClasses}`}
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOffIcon className="text-gray-400" width={iconSize} height={iconSize} />
            ) : (
              <EyeIcon className="text-gray-400" width={iconSize} height={iconSize} />
            )}
          </div>
        )}

        {/* Suffix/Trailing adornment */}
        {adornmentEnd && (
          <div
            className={`absolute inset-y-0 right-0 flex items-center ${paddingRightClasses}`}
          >
            {adornmentEnd}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

