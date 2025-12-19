import React, { useState, useEffect } from 'react';
import type { TabProps, TabItem } from './Tab.type';

const Tab: React.FC<TabProps> = ({
  tabs,
  value,
  onChange,
  className,
  renderLabel,
  renderContent,
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    value || tabs[0]?.value || ''
  );

  // Sync with controlled value prop
  useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);

  const selectTab = (tabValue: string, disabled?: boolean) => {
    if (disabled) {
      return;
    }

    setActiveTab(tabValue);
    if (onChange) {
      onChange(tabValue);
    }
  };

  return (
    <div className={`w-full flex flex-col gap-y-4 ${className || ''}`}>
      <div className="flex border-b border-gray-300 relative">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            disabled={tab.disabled}
            onClick={() => selectTab(tab.value, tab.disabled)}
            className={[
              'flex-1 px-4 py-3 text-sm font-bold transition-all duration-200 relative',
              'bg-transparent border-none',
              {
                'text-gray-500 hover:text-primary-blue cursor-pointer': !tab.disabled,
                'text-gray-300 cursor-not-allowed': tab.disabled,
                'hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[1px] hover:after:bg-primary-blue':
                  !tab.disabled,
                'text-primary-blue': activeTab === tab.value && !tab.disabled,
                'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary-blue':
                  activeTab === tab.value && !tab.disabled,
              },
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {renderLabel ? (
              renderLabel(tab, activeTab)
            ) : (
              <span>{tab.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content area */}
      {renderContent ? (
        renderContent(activeTab)
      ) : (
        <div>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const childName = (child.props as any)?.name;
              if (childName === activeTab) {
                return React.cloneElement(child, { activeTab } as any);
              }
              if (!childName && activeTab === tabs[0]?.value) {
                return child;
              }
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Tab;

