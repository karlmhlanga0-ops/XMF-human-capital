import * as React from 'react';
import { cn } from '../../lib/utils';

export function Form({ className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn('space-y-6', className)} {...props} />;
}

export function FormField({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-2', className)} {...props} />;
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-3 rounded-3xl border border-white/10 bg-slate-950/35 p-5 shadow-glow', className)} {...props} />;
}

export function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-sm font-semibold text-slate-100', className)} {...props} />;
}

export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-slate-400', className)} {...props} />;
}

export function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-orange-300', className)} {...props} />;
}

export function FormControl({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-2', className)} {...props} />;
}
