'use client'

import { useEffect, type ReactNode } from 'react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity"
        style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white max-h-[85vh] flex flex-col animate-slide-up"
        style={{ borderRadius: '16px 16px 0 0' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div
            className="rounded-full"
            style={{ width: 40, height: 4, backgroundColor: '#DDD' }}
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-4 pb-6">
          {children}
        </div>
      </div>
    </div>
  )
}
