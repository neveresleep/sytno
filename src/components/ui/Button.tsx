'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'filled',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = `rounded-[12px] font-semibold transition-transform active:scale-95 disabled:opacity-50 ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''}`

  const variants = {
    filled: 'bg-[#993C1D] text-white',
    outline: 'border-[1.5px] border-[#993C1D] text-[#993C1D] bg-transparent',
    ghost: 'text-[#993C1D] bg-transparent',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
