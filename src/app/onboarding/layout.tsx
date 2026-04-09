'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode } from 'react'

const steps = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5', 'step-6', 'step-6-5', 'step-7']

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const currentStep = steps.findIndex((s) => pathname.includes(s))
  const progress = currentStep >= 0 ? ((currentStep + 1) / steps.length) * 100 : 0

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex-1" />
        <button
          onClick={() => router.push('/nutrition')}
          className="text-sm"
          style={{ color: '#BBB' }}
        >
          Пропустить
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-5">
        <div className="h-[3px] rounded-full" style={{ backgroundColor: '#F0EBE5' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ backgroundColor: '#993C1D', width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-6">
        {children}
      </div>
    </div>
  )
}
