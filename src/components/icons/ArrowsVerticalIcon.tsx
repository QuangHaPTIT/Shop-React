import React from 'react';

interface ArrowsVerticalIconProps {
  className?: string;
}

const ArrowsVerticalIcon: React.FC<ArrowsVerticalIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="8 9 12 5 16 9"></polyline>
    <polyline points="8 15 12 19 16 15"></polyline>
  </svg>
);

export default ArrowsVerticalIcon;

