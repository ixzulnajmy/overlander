import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white hover:bg-white/20 focus:ring-white/30',
        glass: 'liquid-glass text-foreground hover:scale-105 active:scale-95 focus:ring-white/40',
        glassFab: 'liquid-glass-fab text-white hover:scale-110 active:scale-95 focus:ring-blue-400',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'px-3 py-1.5 text-xs',
        lg: 'px-6 py-3 text-base',
        icon: 'h-10 w-10',
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, rounded, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, rounded }), className)}
      {...props}
    />
  )
}
