import React, { useMemo } from 'react';
import type { SwitchTabProps, SwitchTabOption } from './SwitchTab.type';

const SwitchTab: React.FC<SwitchTabProps> = ({
  options,
  value,
  size = 'md',
  disabled = false,
  block = false,
  onChange,
  className,
}) => {
  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: 'text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5',
      md: 'text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2',
      lg: 'text-base md:text-lg px-4 md:px-6 py-2 md:py-3',
    };
    return sizes[size];
  }, [size]);

  const containerClasses = useMemo(() => {
    const baseClasses = 'inline-flex bg-gray-100 rounded-lg p-0.5 md:p-1';
    const blockClasses = block ? 'w-full' : '';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return [baseClasses, blockClasses, disabledClasses, className]
      .filter(Boolean)
      .join(' ');
  }, [block, disabled, className]);

  const selectTab = (option: SwitchTabOption) => {
    if (disabled) return;

    if (onChange) {
      onChange(option.value);
    }
  };

  const isActive = (option: SwitchTabOption) => {
    return value === option.value;
  };

  const getDisplayLabel = (option: SwitchTabOption) => {
    // TODO: Implement i18n if needed
    // return option.translationKey ? t(option.translationKey) : option.label;
    return option.label;
  };

  if (block) {
    return (
      <div className={containerClasses}>
        <div className="overflow-x-auto hide-scrollbar w-full">
          <div className="inline-flex min-w-full flex-nowrap p-0.5 md:p-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => selectTab(option)}
                className={[
                  'relative cursor-pointer rounded-md transition-all duration-200 font-medium whitespace-nowrap',
                  sizeClasses,
                  {
                    'bg-white shadow-sm text-gray-900': isActive(option),
                    'text-gray-600 hover:text-gray-800':
                      !isActive(option) && !disabled,
                    'text-gray-400 cursor-not-allowed': disabled,
                    'flex-shrink-0': true,
                    'flex-grow': true,
                    'text-center': true,
                  },
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="truncate block">{getDisplayLabel(option)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {options.map((option) => (
        <div
          key={option.value}
          onClick={() => selectTab(option)}
          className={[
            'relative cursor-pointer rounded-md transition-all duration-200 font-medium whitespace-nowrap md:whitespace-normal',
            sizeClasses,
            {
              'bg-white shadow-sm text-gray-900': isActive(option),
              'text-gray-600 hover:text-gray-800': !isActive(option) && !disabled,
              'text-gray-400 cursor-not-allowed': disabled,
              'min-w-[60px] md:min-w-[80px]': true,
              'md:mx-0.5': options.length <= 5,
            },
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="truncate block">{getDisplayLabel(option)}</span>
        </div>
      ))}
    </div>
  );
};

export default SwitchTab;

