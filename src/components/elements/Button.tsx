import React from 'react';
import type { ButtonProps } from './Button.type';
import Loading from './Loading';

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  type = 'button',
  variant = 'filled',
  color = 'primary',
  disabled = false,
  loading = false,
  block = false,
  size = 'md',
  iconOnly = false,
  customClass,
  onClick,
  children,
  iconLeft,
  iconRight,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const baseClasses =
    'inline-flex flex-wrap md:flex-nowrap items-center justify-center rounded transition font-medium gap-2';

  const blockClass = block ? 'w-full' : '';
  const iconOnlyClass = iconOnly ? 'gap-0' : '';

  const getSizeClass = (): string => {
    if (iconOnly) return 'p-1';
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      case 'xl':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const getVariantClasses = (): string => {
    if (customClass) return '';

    const variantClassMap: Record<
      NonNullable<ButtonProps['variant']>,
      Record<NonNullable<ButtonProps['color']>, string>
    > = {
      outline: {
        primary:
          'border border-primary text-primary hover:bg-primary hover:text-white',
        success:
          'border border-[var(--success)] text-[var(--success)] hover:bg-[var(--success)] hover:text-white hover:border-[var(--success)]',
        danger:
          'border border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white hover:border-[var(--danger)]',
        secondary: '',
      },
      text: {
        primary: 'text-primary hover:bg-primary hover:text-white',
        secondary:
          'text-[var(--secondary-text)] hover:bg-gray-100 hover:text-[var(--secondary-text)]',
        success:
          'text-[var(--success)] hover:bg-[var(--success)]/10 hover:text-[var(--success)]',
        danger:
          'text-[var(--danger)] hover:bg-[var(--danger)]/10 hover:text-[var(--danger)]',
      },
      filled: {
        primary:
          'bg-primary text-white disabled:bg-primary/60 hover:bg-primary hover:opacity-85',
        success:
          'bg-[var(--success)] text-white disabled:bg-[var(--success)]/60 hover:bg-[var(--success)] hover:opacity-85',
        danger:
          'bg-[var(--danger)] text-white disabled:bg-[var(--danger)]/60 hover:bg-[var(--danger)] hover:opacity-85',
        secondary: '',
      },
    };

    const currentVariant = variant || 'filled';
    const currentColor = color || 'primary';
    const variantClasses = variantClassMap[currentVariant]?.[currentColor] || '';
    return isDisabled ? variantClasses.replace(/hover:[^\s]+/g, '') : variantClasses;
  };

  const classes = [
    baseClasses,
    blockClass,
    iconOnlyClass,
    getSizeClass(),
    getVariantClasses(),
    customClass || '',
    'font-normal',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={classes}
      onClick={handleClick}
      {...rest}
    >
      {iconLeft}
      {!iconOnly && children && <span className="text">{children}</span>}
      {iconRight}
      <Loading isLoading={loading} size="small" />
    </button>
  );
};

export default Button;

