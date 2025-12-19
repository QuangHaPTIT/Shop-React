import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { SearchBoxProps, SearchBoxOption } from './SearchBox.type';
import SearchIcon from '../icons/SearchIcon';
import XMarkIcon from '../icons/XMarkIcon';

const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  options = [],
  labelKey = 'label',
  trackByKey = 'id',
  multiple = true,
  searchable = true,
  closeOnSelect = false,
  clearOnSelect = false,
  preserveSearch = true,
  placeholder = 'Search...',
  labelText = '',
  loading = false,
  allowCreate = false,
  validateTag,
  onChange,
  onSearchChange,
  onOpen,
  renderOption,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<any[]>(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return value ? [value] : [];
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update selectedValues when value prop changes
  useEffect(() => {
    if (multiple) {
      setSelectedValues(Array.isArray(value) ? value : []);
    } else {
      setSelectedValues(value ? [value] : []);
    }
  }, [value, multiple]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (!preserveSearch) {
          setSearchQuery('');
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (onOpen) {
        onOpen();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, preserveSearch, onOpen]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) {
      return options;
    }
    const query = searchQuery.toLowerCase();
    return options.filter((option) => {
      const label = String(option[labelKey] || '').toLowerCase();
      return label.includes(query);
    });
  }, [options, searchQuery, labelKey, searchable]);

  const isSelected = (option: SearchBoxOption): boolean => {
    const optionValue = option[trackByKey] ?? option;
    return selectedValues.some((val) => {
      const valKey = typeof val === 'object' ? val[trackByKey] : val;
      return valKey === optionValue;
    });
  };

  const handleSelect = (option: SearchBoxOption) => {
    const optionValue = option[trackByKey] ?? option;

    if (multiple) {
      const isAlreadySelected = isSelected(option);
      let newValues: any[];

      if (isAlreadySelected) {
        newValues = selectedValues.filter((val) => {
          const valKey = typeof val === 'object' ? val[trackByKey] : val;
          return valKey !== optionValue;
        });
      } else {
        newValues = [...selectedValues, option];
      }

      setSelectedValues(newValues);
      if (onChange) {
        onChange(newValues);
      }

      if (closeOnSelect && !isAlreadySelected) {
        setIsOpen(false);
      }
    } else {
      setSelectedValues([option]);
      if (onChange) {
        onChange(option);
      }
      setIsOpen(false);
    }

    if (clearOnSelect) {
      setSearchQuery('');
    }
  };

  const handleRemoveTag = (option: SearchBoxOption, event: React.MouseEvent) => {
    event.stopPropagation();
    const optionValue = option[trackByKey] ?? option;
    const newValues = selectedValues.filter((val) => {
      const valKey = typeof val === 'object' ? val[trackByKey] : val;
      return valKey !== optionValue;
    });
    setSelectedValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  const handleCreateTag = () => {
    const tagText = searchQuery.trim();
    if (!tagText || !allowCreate) return;
    if (validateTag && !validateTag(tagText)) return;

    const newOption: SearchBoxOption = {
      [labelKey]: tagText,
      [trackByKey]: tagText,
    };

    // Check if already exists
    const exists = selectedValues.some((val) => {
      const valKey = typeof val === 'object' ? val[trackByKey] : val;
      return valKey === tagText;
    });

    if (exists) return;

    if (multiple) {
      const newValues = [...selectedValues, newOption];
      setSelectedValues(newValues);
      if (onChange) {
        onChange(newValues);
      }
    } else {
      setSelectedValues([newOption]);
      if (onChange) {
        onChange(newOption);
      }
    }

    setSearchQuery('');
  };

  const getDisplayValue = (): string => {
    if (multiple) {
      if (selectedValues.length === 0) return '';
      if (selectedValues.length === 1) {
        const val = selectedValues[0];
        return typeof val === 'object' ? val[labelKey] : String(val);
      }
      return `${selectedValues.length} selected`;
    } else {
      if (selectedValues.length === 0) return '';
      const val = selectedValues[0];
      return typeof val === 'object' ? val[labelKey] : String(val);
    }
  };

  return (
    <div
      className={`w-full ${labelText ? 'flex items-center gap-3' : ''} ${className || ''}`}
    >
      <div
        ref={containerRef}
        className={`relative ${labelText ? 'flex-1' : 'w-full'}`}
      >
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
          <SearchIcon className="text-gray-400 w-4 h-4" />
        </div>

        {/* Input/Selected Tags */}
        <div
          className="relative w-full min-h-[38px] pl-10 pr-2 py-1 border border-gray-300 rounded-md bg-white cursor-text flex flex-wrap items-center gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {multiple && selectedValues.length > 0 && (
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedValues.map((val, index) => {
                const displayLabel =
                  typeof val === 'object' ? val[labelKey] : String(val);
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#e9f2ff] text-[var(--primary-blue)] rounded-md text-sm font-medium"
                  >
                    {displayLabel}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveTag(val, e)}
                      className="hover:text-blue-700"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            value={multiple ? searchQuery : (isOpen ? searchQuery : getDisplayValue())}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && allowCreate && searchQuery.trim()) {
                e.preventDefault();
                handleCreateTag();
              }
            }}
            placeholder={
              multiple && selectedValues.length > 0
                ? ''
                : !isOpen && !multiple && selectedValues.length > 0
                ? ''
                : placeholder
            }
            className="flex-1 min-w-[120px] outline-none text-sm"
            readOnly={!searchable || (!multiple && !isOpen)}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {loading && (
              <div className="p-3 text-center text-sm text-gray-500">
                Loading...
              </div>
            )}

            {!loading && filteredOptions.length === 0 && (
              <div className="p-3 text-center text-sm text-gray-500">
                No options found
              </div>
            )}

            {!loading &&
              filteredOptions.map((option, index) => {
                const selected = isSelected(option);
                const displayLabel =
                  typeof option === 'object' ? option[labelKey] : String(option);

                return (
                  <div
                    key={index}
                    className={`px-3 py-2 cursor-pointer text-sm ${
                      selected
                        ? 'bg-[#e9f2ff] text-[var(--primary-blue)]'
                        : 'hover:bg-[#e9f2ff] hover:text-[var(--primary-blue)]'
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {renderOption ? renderOption(option) : <span>{displayLabel}</span>}
                  </div>
                );
              })}

            {!loading &&
              allowCreate &&
              searchQuery.trim() &&
              !filteredOptions.some(
                (opt) =>
                  String(opt[labelKey] || '').toLowerCase() ===
                  searchQuery.toLowerCase()
              ) && (
                <div
                  className="px-3 py-2 cursor-pointer text-sm hover:bg-[#e9f2ff] hover:text-[var(--primary-blue)] border-t border-gray-200"
                  onClick={handleCreateTag}
                >
                  Create "{searchQuery}"
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;

