import { ImgHTMLAttributes } from 'react';
import { cn, getInitials } from '../lib/utils';
import Image from 'next/image';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'src'> {
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

export function Avatar({ src, alt, size = 'md', fallback, className, ...props }: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800',
        sizes[size],
        className
      )}
    >
      {src ? (
        <Image 
          src={src} 
          alt={alt || "Avatar"} 
          width={40} 
          height={40} 
          className="h-full w-full object-cover" 
          {...props}
        />
      ) : (
        <span className="font-medium text-slate-300">
          {fallback ? getInitials(fallback) : '??'}
        </span>
      )}
    </div>
  );
}
