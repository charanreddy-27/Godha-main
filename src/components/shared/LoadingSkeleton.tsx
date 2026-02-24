import { cn } from '@/utils/cn';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-royal-100/40 bg-white overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-ivory-100" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-ivory-100 rounded w-1/3" />
        <div className="h-4 bg-ivory-100 rounded w-3/4" />
        <div className="h-5 bg-ivory-100 rounded w-1/2" />
      </div>
    </div>
  );
}

export function LoadingSkeleton({
  className,
  count = 6,
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
