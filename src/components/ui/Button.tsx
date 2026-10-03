import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const variantClasses = {
    primary:
      'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-[#3B82F6] dark:text-white dark:hover:bg-[#2563eb] shadow-sm',
    secondary:
      'bg-[#F9FAFB] text-[#111827] border border-[#E5E7EB] hover:bg-zinc-100 dark:bg-[#18181B] dark:text-[#F9FAFB] dark:border-[#27272A] dark:hover:bg-zinc-800',
    outline:
      'bg-transparent text-[#111827] dark:text-[#F9FAFB] border border-[#E5E7EB] dark:border-[#27272A] hover:bg-zinc-50 dark:hover:bg-zinc-900',
    ghost:
      'bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-[#111827] dark:hover:text-[#F9FAFB] hover:bg-zinc-100 dark:hover:bg-zinc-800/60',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
