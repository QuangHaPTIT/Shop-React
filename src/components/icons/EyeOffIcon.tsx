import React from 'react';

interface EyeOffIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const EyeOffIcon: React.FC<EyeOffIconProps> = ({ className, width = 20, height = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    <line x1="2" y1="2" x2="22" y2="22"></line>
  </svg>
);

export default EyeOffIcon;

