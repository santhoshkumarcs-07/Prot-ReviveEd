import { type HTMLAttributes } from 'react';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'experience' | 'evidence';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[var(--color-surface-raised)] border border-white/[.07]',
  elevated: 'bg-[var(--color-surface-raised)] shadow-[var(--shadow-md)] border border-white/[.07]',
  outlined: 'bg-[var(--color-surface-raised)] border border-white/[.08]',
  experience:
    'bg-[var(--color-surface-raised)] border border-white/[.08] shadow-[var(--shadow-sm)]',
  evidence: 'bg-[var(--color-parchment)] border border-white/[.08]',
};

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

function Card({
  variant = 'default',
  hoverable = false,
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-[var(--radius-lg)]
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverable ? 'interactive' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, type CardProps, type CardVariant };
