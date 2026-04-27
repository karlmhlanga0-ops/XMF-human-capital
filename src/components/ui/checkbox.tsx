import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      'h-5 w-5 rounded-lg border border-white/15 bg-white/10 text-orange-400 shadow-sm transition focus:ring-2 focus:ring-orange-300/30',
      className,
    )}
    {...props}
  />
));
Checkbox.displayName = 'Checkbox';
