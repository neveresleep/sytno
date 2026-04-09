'use client'

import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/lib/onboarding-store'
import { Button, Chip } from '@/components/ui'

const goals = [
  { emoji: '📉', label: 'Похудеть', value: 'lose' },
  { emoji: '⚖️', label: 'Поддержать вес', value: 'maintain' },
  { emoji: '📈', label: 'Набрать массу', value: 'gain' },
]

const frequencies = [
  { label: 'Каждый день', value: 'daily' },
  { label: '3–4 раза в неделю', value: '3-4week' },
  { label: 'Готовлю сразу на несколько дней', value: 'fewdays' },
]

export default function Step6() {
  const router = useRouter()
  const { goal, cook_frequency, setField } = useOnboardingStore()

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] justify-between">
      <div>
        <h1 className="font-display text-xl font-semibold mt-4">Твои цели</h1>

        {/* Цель */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Цель</p>
        <div className="flex flex-col gap-3">
          {goals.map((g) => (
            <button
              key={g.value}
              onClick={() => setField('goal', g.value)}
              className="flex items-center gap-3 p-4 rounded-[12px] border-2 text-left transition-colors"
              style={{
                borderColor: goal === g.value ? '#993C1D' : '#F0EBE5',
                backgroundColor: goal === g.value ? '#FAECE7' : '#FFF',
              }}
            >
              <span className="text-2xl">{g.emoji}</span>
              <span
                className="text-sm font-medium"
                style={{ color: goal === g.value ? '#993C1D' : '#666' }}
              >
                {g.label}
              </span>
            </button>
          ))}
        </div>

        {/* Как часто готовишь */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Как часто готовишь?</p>
        <div className="flex flex-wrap gap-2">
          {frequencies.map((f) => (
            <Chip
              key={f.value}
              label={f.label}
              variant={cook_frequency === f.value ? 'active' : 'default'}
              onClick={() => setField('cook_frequency', f.value)}
            />
          ))}
        </div>
      </div>

      <div className="w-full mt-8 pb-4">
        <Button fullWidth onClick={() => router.push('/onboarding/step-6-5')}>
          Далее →
        </Button>
      </div>
    </div>
  )
}
