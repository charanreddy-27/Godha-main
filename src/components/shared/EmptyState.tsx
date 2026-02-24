import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 px-4 text-center',
        className
      )}
    >
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h2 className="font-display text-2xl font-bold text-royal-900 mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-royal-500 max-w-sm mb-6">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="bg-royal-700 hover:bg-royal-800 text-white">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
