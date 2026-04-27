import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-sm text-white shadow-sm transition placeholder:text-slate-300 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300/20',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';
