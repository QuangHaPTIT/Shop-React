import React from 'react';

interface LabelProps {
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ children, className, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

export default Label;

