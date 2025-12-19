import React, { useMemo } from 'react';
import type { TagProps } from './Tag.type';

const SHORT_HEX_REGEX = /^#([0-9a-f]{3})$/i;
const LONG_HEX_REGEX = /^#([0-9a-f]{6})$/i;
const HEX_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const presetNames = new Set([
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'gray',
  'dark',
]);

const Tag: React.FC<TagProps> = ({
  size = 'normal',
  radius = 'middle',
  color = 'primary',
  iconLeft,
  children,
  className,
}) => {
  const isCustomColor = useMemo(() => {
    if (typeof color !== 'string') return false;
    return !presetNames.has(color) || HEX_REGEX.test(color);
  }, [color]);

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'px-2 py-0.5 text-xs';
      case 'large':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  }, [size]);

  const radiusClasses = useMemo(() => {
    switch (radius) {
      case 'small':
        return 'rounded';
      case 'large':
        return 'rounded-full';
      default:
        return 'rounded-md';
    }
  }, [radius]);

  const colorClasses = useMemo(() => {
    if (isCustomColor) return '';

    switch (color) {
      case 'success':
        return 'bg-green-700';
      case 'danger':
        return 'bg-red-500';
      case 'warning':
        return 'bg-orange-500';
      case 'info':
        return 'bg-blue-500';
      case 'gray':
        return 'bg-gray-200';
      case 'dark':
        return 'bg-gray-600';
      default:
        return 'bg-primary';
    }
  }, [color, isCustomColor]);

  const textColorClasses = useMemo(() => {
    if (isCustomColor) return '';

    switch (color) {
      case 'gray':
        return 'text-gray-700';
      default:
        return 'text-white';
    }
  }, [color, isCustomColor]);

  const getContrastText = (bg: string): string => {
    let r = 0,
      g = 0,
      b = 0;

    if (SHORT_HEX_REGEX.test(bg)) {
      const m = bg.substring(1);
      r = parseInt(m[0] + m[0], 16);
      g = parseInt(m[1] + m[1], 16);
      b = parseInt(m[2] + m[2], 16);
    } else if (LONG_HEX_REGEX.test(bg)) {
      r = parseInt(bg.slice(1, 3), 16);
      g = parseInt(bg.slice(3, 5), 16);
      b = parseInt(bg.slice(5, 7), 16);
    } else {
      return 'white';
    }

    const luminance =
      0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return luminance > 0.6 ? 'black' : 'white';
  };

  const customStyle = useMemo(() => {
    if (!isCustomColor) return {};

    const bg = String(color);
    return {
      backgroundColor: bg,
      color: getContrastText(bg),
    };
  }, [isCustomColor, color]);

  return (
    <div
      className={[
        'inline-flex items-center justify-center gap-1',
        sizeClasses,
        radiusClasses,
        colorClasses,
        textColorClasses,
        className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={customStyle}
    >
      {iconLeft}
      {children && (
        <span className={iconLeft ? 'ml-1' : ''}>{children}</span>
      )}
    </div>
  );
};

export default Tag;

