import React from 'react';

interface CircleExclamationIconProps {
  className?: string;
}

const CircleExclamationIcon: React.FC<CircleExclamationIconProps> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

export default CircleExclamationIcon;

