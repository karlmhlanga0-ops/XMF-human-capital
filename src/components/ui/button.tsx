import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-orange/90 to-brand-orange px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-orange/50',
        className,
      )}
      {...props}
    />
  );
}
