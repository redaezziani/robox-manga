import { cn } from '@/lib/utils';

import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-200 dark:bg-background border border-border/80 rounded-md',
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-300/20 to-transparent"
        style={{
          animation: 'shimmer 1.5s infinite linear',
          backgroundSize: '200% 100%',
          transform: 'translateX(-100%)',
        }}
      />
    </div>
  );
}

export { Skeleton };