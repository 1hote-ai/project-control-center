import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md';
  color?: 'blue' | 'green' | 'yellow' | 'red';
  className?: string;
}

export function ProgressBar({ value, size = 'md', color = 'blue', className }: ProgressBarProps) {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-slate-700/50', sizes[size], className)}>
      <motion.div
        className={cn('h-full rounded-full', colors[color])}
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}
