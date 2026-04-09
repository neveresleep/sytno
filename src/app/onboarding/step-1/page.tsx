'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'

const dishes = [
  { emoji: '🥗', name: 'Салат', kcal: 320 },
  { emoji: '🍲', name: 'Суп', kcal: 420 },
  { emoji: '🥘', name: 'Рагу', kcal: 510 },
]

export default function Step1() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center text-center min-h-[calc(100vh-120px)] justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold mt-8" style={{ color: '#993C1D' }}>
          Сытно
        </h1>

        <p className="mt-6 text-sm leading-relaxed max-w-[280px]" style={{ color: '#666' }}>
          Ты либо голодный и не знаешь что приготовить, либо переедаешь потому что готовишь наугад
        </p>

        <div className="flex gap-3 mt-8 justify-center">
          {dishes.map((d) => (
            <div
              key={d.name}
              className="w-24 h-28 rounded-[14px] flex flex-col items-center justify-center"
              style={{ backgroundColor: '#FFF4EF' }}
            >
              <span className="text-3xl">{d.emoji}</span>
              <span className="text-xs mt-2 font-medium" style={{ color: '#993C1D' }}>
                {d.kcal} ккал
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-8 pb-4">
        <Button fullWidth onClick={() => router.push('/onboarding/step-2')}>
          Начать →
        </Button>
      </div>
    </div>
  )
}
