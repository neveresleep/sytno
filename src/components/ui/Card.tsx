import { forwardRef, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  today?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ today = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] ${className}`}
        style={{ backgroundColor: today ? '#FFF4EF' : '#FFFFFF' }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
