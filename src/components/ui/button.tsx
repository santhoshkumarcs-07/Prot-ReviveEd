'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'curiosity';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-amber)] text-[#171312] hover:bg-[var(--color-amber-soft)] active:scale-[0.98] shadow-[0_8px_20px_rgba(255,107,61,.18)]',
  secondary:
    'bg-[var(--color-surface-raised)] text-[var(--color-ink)] border border-white/[.1] hover:border-white/[.2] hover:bg-white/[.05] active:scale-[0.98]',
  ghost:
    'bg-transparent text-[var(--color-gray-600)] hover:text-[var(--color-ink)] hover:bg-[var(--color-gray-100)] active:scale-[0.98]',
  danger:
    'bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-soft)] active:scale-[0.98]',
  curiosity:
    'bg-[var(--color-amber)] text-[var(--color-ink)] hover:bg-[var(--color-amber-soft)] active:scale-[0.98] font-semibold',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-[var(--radius-sm)] gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-[var(--radius-md)] gap-2',
  lg: 'px-6 py-3 text-base rounded-[var(--radius-md)] gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      className = '',
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center
          font-medium
          transition-all duration-[var(--duration-fast)]
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-amber)]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `.trim()}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon && iconPosition === 'left' ? (
          icon
        ) : null}
        {children}
        {!loading && icon && iconPosition === 'right' ? icon : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
