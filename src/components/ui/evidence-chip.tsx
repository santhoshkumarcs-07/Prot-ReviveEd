import type { EvidenceStrength } from '@/types/evidence';

interface EvidenceChipProps {
  strength: EvidenceStrength;
  label?: string;
  showDot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const strengthConfig: Record<EvidenceStrength, { bg: string; text: string; dot: string; label: string }> = {
  strong: {
    bg: 'bg-[color:var(--color-emerald)]/10',
    text: 'text-[var(--color-demonstrated)]',
    dot: 'bg-[var(--color-demonstrated)]',
    label: 'Strong',
  },
  moderate: {
    bg: 'bg-[color:var(--color-teal)]/10',
    text: 'text-[var(--color-evidence)]',
    dot: 'bg-[var(--color-evidence)]',
    label: 'Moderate',
  },
  developing: {
    bg: 'bg-[color:var(--color-violet)]/10',
    text: 'text-[var(--color-developing)]',
    dot: 'bg-[var(--color-developing)]',
    label: 'Developing',
  },
  weak: {
    bg: 'bg-[color:var(--color-coral)]/10',
    text: 'text-[var(--color-uncertainty)]',
    dot: 'bg-[var(--color-uncertainty)]',
    label: 'Weak',
  },
  insufficient: {
    bg: 'bg-[var(--color-gray-100)]',
    text: 'text-[var(--color-muted)]',
    dot: 'bg-[var(--color-muted)]',
    label: 'Insufficient',
  },
};

function EvidenceChip({
  strength,
  label,
  showDot = true,
  size = 'sm',
  className = '',
}: EvidenceChipProps) {
  const config = strengthConfig[strength];
  const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-[var(--radius-full)]
        font-medium
        ${config.bg} ${config.text}
        ${sizeClasses}
        ${className}
      `.trim()}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      )}
      {label || config.label}
    </span>
  );
}

export { EvidenceChip, type EvidenceChipProps };
