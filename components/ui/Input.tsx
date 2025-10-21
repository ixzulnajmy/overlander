import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn('w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30', className)}
      {...props}
    />
  )
)
Input.displayName = 'Input'
