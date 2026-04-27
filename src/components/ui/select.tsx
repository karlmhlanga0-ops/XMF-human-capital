import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'flex h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-sm text-white shadow-sm transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300/20',
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = 'Select';
