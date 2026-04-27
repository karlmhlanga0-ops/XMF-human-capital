import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  );
}
