import React, { useMemo } from 'react';
import type { DividerProps, HrClass } from './Divider.type';

const Divider: React.FC<DividerProps> = ({
  hrClass,
  label,
  labelPosition = 'center',
  labelClass = '',
  vertical = false,
}) => {
  const isString = (v: any): v is string => typeof v === 'string';

  const leftHrClass = useMemo(() => {
    if (!hrClass) {
      return 'border-gray-300';
    }
    if (isString(hrClass)) {
      return hrClass;
    }
    return hrClass.left || 'border-gray-300';
  }, [hrClass]);

  const rightHrClass = useMemo(() => {
    if (!hrClass) {
      return 'border-gray-300';
    }
    if (isString(hrClass)) {
      return hrClass;
    }
    return hrClass.right || 'border-gray-300';
  }, [hrClass]);

  const verticalClass = useMemo(() => {
    if (!hrClass) return 'border-gray-300';
    if (isString(hrClass)) {
      return hrClass;
    }
    return hrClass.vertical || hrClass.left || 'border-gray-300';
  }, [hrClass]);

  const haveLeftHr = labelPosition === 'end' || labelPosition === 'center';
  const haveRightHr = labelPosition === 'start' || labelPosition === 'center';

  if (vertical) {
    return (
      <div className="flex flex-col items-center mx-2">
        <div className={`${verticalClass} border-l h-full`}></div>
        {label && (
          <span
            className={`mt-2 rotate-90 whitespace-nowrap ${labelClass}`}
          >
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center my-4">
      <hr
        className={`${leftHrClass} ${haveLeftHr ? 'flex-1 w-full' : 'flex-0 w-10'}`}
      />
      {label && (
        <span className={`flex-initial mx-10 ${labelClass}`}>{label}</span>
      )}
      <hr
        className={`${rightHrClass} ${haveRightHr ? 'flex-1 w-full' : 'flex-0 w-10'}`}
      />
    </div>
  );
};

export default Divider;

