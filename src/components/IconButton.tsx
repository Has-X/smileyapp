import type { JSX } from 'preact';
import { cn } from '../utils/cn';

interface IconButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function IconButton({ 
  icon, 
  label, 
  variant = 'default', 
  size = 'md', 
  className,
  disabled,
  ...props 
}: IconButtonProps) {
  const baseClasses = 'btn btn-square transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
  
  const variantClasses = {
    default: 'btn-primary',
    ghost: 'btn-ghost',
    outline: 'btn-outline',
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md', 
    lg: 'btn-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'btn-disabled',
        className
      )}
      aria-label={label}
      title={label}
      disabled={disabled}
      {...props}
    >
      <span className="text-lg" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
