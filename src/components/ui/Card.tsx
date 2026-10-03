import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 text-[#111827] dark:text-[#F9FAFB] transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
