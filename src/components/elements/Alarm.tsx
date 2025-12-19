import React from 'react';
import type { AlarmProps } from './Alarm.type';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import TriangleExclamationIcon from '../icons/TriangleExclamationIcon';
import CircleInfoIcon from '../icons/CircleInfoIcon';
import CircleExclamationIcon from '../icons/CircleExclamationIcon';
import XMarkIcon from '../icons/XMarkIcon';

interface TypeStyles {
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  defaultIcon: React.ReactNode;
}

const Alarm: React.FC<AlarmProps> = ({
  type = 'info',
  title,
  icon,
  closable = false,
  onClose,
  children,
  className,
}) => {
  const getTypeStyles = (): TypeStyles => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          iconColor: 'text-green-400',
          defaultIcon: <CheckCircleIcon className="h-5 w-5" />,
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-700',
          iconColor: 'text-yellow-400',
          defaultIcon: <TriangleExclamationIcon className="h-5 w-5" />,
        };
      case 'info':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-400',
          defaultIcon: <CircleInfoIcon className="h-5 w-5" />,
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-600',
          iconColor: 'text-red-400',
          defaultIcon: <CircleExclamationIcon className="h-5 w-5" />,
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-400',
          defaultIcon: <CircleInfoIcon className="h-5 w-5" />,
        };
    }
  };

  const typeStyles = getTypeStyles();
  const iconToUse = icon || typeStyles.defaultIcon;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`rounded-md border p-4 flex gap-3 ${typeStyles.bgColor} ${typeStyles.borderColor} ${className || ''}`}
    >
      <div className="flex-shrink-0">
        <div className={typeStyles.iconColor} aria-hidden="true">
          {iconToUse}
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-y-2">
        {title && (
          <div className={`font-medium ${typeStyles.textColor}`}>{title}</div>
        )}
        {children && <div className={typeStyles.textColor}>{children}</div>}
      </div>
      {closable && (
        <div className="flex-shrink-0">
          <button
            type="button"
            className={`rounded-md inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${typeStyles.textColor}`}
            onClick={handleClose}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Alarm;

