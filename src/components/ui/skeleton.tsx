interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] p-6 space-y-4">
      <Skeleton height="12px" width="40%" />
      <Skeleton height="24px" width="80%" />
      <Skeleton height="16px" width="60%" />
      <div className="flex gap-2 pt-2">
        <Skeleton height="32px" width="80px" className="rounded-[var(--radius-sm)]" />
        <Skeleton height="32px" width="60px" className="rounded-[var(--radius-sm)]" />
      </div>
    </div>
  );
}

function SkeletonExperienceCard() {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] border border-[var(--color-gray-200)] overflow-hidden">
      <Skeleton height="180px" width="100%" className="rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton height="10px" width="30%" />
        <Skeleton height="22px" width="85%" />
        <Skeleton height="14px" width="70%" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonExperienceCard };
