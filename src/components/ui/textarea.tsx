import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'min-h-[120px] w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white shadow-sm transition placeholder:text-slate-300 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300/20',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';
