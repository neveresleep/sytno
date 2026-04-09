'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/lib/onboarding-store'
import { Button, Chip } from '@/components/ui'

const allergyOptions = ['Глютен', 'Лактоза', 'Орехи', 'Яйца', 'Морепродукты', 'Соя', 'Кунжут']
const conditionOptions = ['Диабет 2 типа', 'Гипертония', 'Гастрит', 'Холецистит', 'Синдром раздражённого кишечника']

export default function Step5() {
  const router = useRouter()
  const { allergies, conditions, setField } = useOnboardingStore()
  const [customInput, setCustomInput] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  function toggleAllergy(item: string) {
    const next = allergies.includes(item)
      ? allergies.filter((a) => a !== item)
      : [...allergies, item]
    setField('allergies', next)
  }

  function toggleCondition(item: string) {
    const next = conditions.includes(item)
      ? conditions.filter((c) => c !== item)
      : [...conditions, item]
    setField('conditions', next)
  }

  function addCustomCondition() {
    const val = customInput.trim()
    if (!val || conditions.includes(val)) return
    setField('conditions', [...conditions, val])
    setCustomInput('')
    setShowCustom(false)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] justify-between">
      <div>
        <h1 className="font-display text-xl font-semibold mt-4">Здоровье</h1>

        {/* Аллергии */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Аллергии</p>
        <div className="flex flex-wrap gap-2">
          {allergyOptions.map((a) => (
            <Chip
              key={a}
              label={a}
              variant={allergies.includes(a) ? 'danger' : 'default'}
              onClick={() => toggleAllergy(a)}
            />
          ))}
        </div>

        {/* Заболевания */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Заболевания</p>
        <div className="flex flex-wrap gap-2">
          {conditionOptions.map((c) => (
            <Chip
              key={c}
              label={c}
              variant={conditions.includes(c) ? 'danger' : 'default'}
              onClick={() => toggleCondition(c)}
            />
          ))}
          {conditions
            .filter((c) => !conditionOptions.includes(c))
            .map((c) => (
              <Chip
                key={c}
                label={c}
                variant="danger"
                onRemove={() => toggleCondition(c)}
              />
            ))}
        </div>

        {showCustom ? (
          <div className="flex gap-2 mt-3">
            <input
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomCondition()}
              placeholder="Введите заболевание"
              className="flex-1 rounded-[10px] border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#993C1D]"
              autoFocus
            />
            <Button size="sm" onClick={addCustomCondition}>+</Button>
          </div>
        ) : (
          <button
            onClick={() => setShowCustom(true)}
            className="mt-3 text-sm font-medium"
            style={{ color: '#993C1D' }}
          >
            + добавить своё
          </button>
        )}

        {/* Дисклеймер */}
        <p className="mt-8 text-xs" style={{ color: '#BBB' }}>
          Рекомендации носят информационный характер и не заменяют консультацию врача
        </p>
      </div>

      <div className="w-full mt-8 pb-4">
        <Button fullWidth onClick={() => router.push('/onboarding/step-6')}>
          Далее →
        </Button>
      </div>
    </div>
  )
}
