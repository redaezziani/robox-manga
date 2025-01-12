import * as React from 'react';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface SelectPropsNative
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const SelectNative = React.forwardRef<HTMLSelectElement, SelectPropsNative>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'border-input bg-background text-foreground ring-offset-background focus-visible:border-ring focus-visible:ring-ring/30 has-[option[disabled]:checked]:text-muted-foreground peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border text-sm shadow-sm shadow-black/5 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            props.multiple
              ? '[&_option:checked]:bg-accent py-1 [&>*]:px-3 [&>*]:py-1'
              : 'h-9 pe-8 ps-3',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {!props.multiple && (
          <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
            <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
          </span>
        )}
      </div>
    );
  }
);
SelectNative.displayName = 'SelectNative';

export { SelectNative };
