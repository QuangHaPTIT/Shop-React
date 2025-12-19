import React from 'react';

interface SortIconProps {
  className?: string;
}

const SortIcon: React.FC<SortIconProps> = ({ className }) => (
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
    <path d="M3 6h18"></path>
    <path d="M7 12h10"></path>
    <path d="M10 18h4"></path>
  </svg>
);

export default SortIcon;

