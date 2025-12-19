import React from 'react';
import type { CardProps } from './Card.type';

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-bg-color rounded-lg shadow-md p-6 w-full ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default Card;

