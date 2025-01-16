import React from 'react';

import { cn } from '@/lib/utils';

const Skeleton = ({
  width = 'w-full', // Accept Tailwind width classes
  height = 'h-64', // Accept Tailwind height classes
  className = '', // Additional classes
  showContent = false, // Show content placeholders
}) => {
  return (
    <div className={cn(`relative overflow-hidden ${width} ${height} ${className}`)}>
      {/* Base skeleton */}
      <div className="size-full rounded-lg bg-gray-200" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300/60 to-transparent" />

      {/* Shine effect */}
      <div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          animation: 'shine 2s infinite linear',
        }}
      />

      {/* Optional content placeholder shapes */}
      {showContent && (
        <div className="absolute bottom-4 left-4 space-y-2">
          <div className="h-4 w-48 rounded bg-gray-300" />
          <div className="h-4 w-32 rounded bg-gray-300" />
        </div>
      )}

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

// Example usage component to demonstrate different sizes
const ExampleUsage = () => {
  return (
    <div className="space-y-4">
      {/* Small skeleton */}
      <Skeleton width="w-32" height="h-32" showContent={false} />

      {/* Medium skeleton */}
      <Skeleton width="w-64" height="h-48" />

      {/* Large skeleton with custom class */}
      <Skeleton width="w-full" height="h-96" className="max-w-2xl" />

      {/* Card-like skeleton */}
      <Skeleton width="w-72" height="h-40" className="shadow-lg" />
    </div>
  );
};

export default Skeleton;
