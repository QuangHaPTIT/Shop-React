import React, { useMemo } from 'react';
import type { TextareaComponentProps } from './Textarea.type';
import Label from './Label';

const Textarea: React.FC<TextareaComponentProps> = ({
  label,
  textareaProps,
  value = '',
  onChange,
  onBlur,
}) => {
  const getResizeClass = useMemo(() => {
    if (!textareaProps.resizable) return 'resize-none';
    if (textareaProps.resizable === true) return 'resize-y';

    switch (textareaProps.resizable) {
      case 'vertical':
        return 'resize-y';
      case 'horizontal':
        return 'resize-x';
      case 'both':
        return 'resize';
      case 'none':
      default:
        return 'resize-none';
    }
  }, [textareaProps.resizable]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    if (textareaProps.onChange) {
      textareaProps.onChange(event);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    if (textareaProps.onInput) {
      textareaProps.onInput(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(event);
    }
    if (textareaProps.onBlur) {
      textareaProps.onBlur(event);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <div
        className={`relative w-full ${
          textareaProps.disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <textarea
          {...textareaProps}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={textareaProps.onFocus}
          onKeyUp={textareaProps.onKeyup}
          onKeyDown={textareaProps.onKeydown}
          onKeyPress={textareaProps.onKeypress}
          onInput={handleInput}
          placeholder={textareaProps.placeholder ?? ''}
          required={textareaProps.required ?? false}
          disabled={textareaProps.disabled ?? false}
          readOnly={textareaProps.readonly ?? false}
          rows={textareaProps.rows ?? 4}
          name={textareaProps.name}
          maxLength={textareaProps.maxlength}
          className={[
            textareaProps.className || '',
            'w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary-blue focus:shadow-[0_0_0_2px_rgba(13,110,253,0.25)] transition-all',
            getResizeClass,
          ]
            .filter(Boolean)
            .join(' ')}
        />

        {/* Character counter */}
        {textareaProps.maxlength && textareaProps.showCharCount && (
          <div className="text-xs text-gray-500 mt-1 text-right">
            {value.length} / {textareaProps.maxlength}
          </div>
        )}
      </div>
    </div>
  );
};

export default Textarea;

