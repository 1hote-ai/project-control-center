import { cn } from '../lib/utils';

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className, width, height, variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-slate-700/50';
  
  const variantClasses = {
    text: 'rounded-md h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        width: width ?? (variant === 'circular' ? '40px' : undefined),
        height: height ?? (variant === 'circular' ? '40px' : undefined),
      }}
    />
  );
}
