'use client'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingActionButtonProps {
  onClick?: () => void
  icon?: React.ReactNode
  className?: string
  ariaLabel?: string
}

export default function FloatingActionButton({
  onClick,
  icon = <Plus className="w-6 h-6" />,
  className,
  ariaLabel = 'Add new item'
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'fixed z-[1001] flex items-center justify-center',
        'w-14 h-14 rounded-full',
        'liquid-glass-fab',
        'text-white',
        'transition-all duration-200 ease-out',
        'hover:scale-110 hover:-translate-y-1',
        'active:scale-95 active:translate-y-0',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent',
        className
      )}
      style={{
        right: '20px',
        bottom: 'max(88px, calc(env(safe-area-inset-bottom, 12px) + 76px))'
      }}
    >
      {icon}
    </button>
  )
}
