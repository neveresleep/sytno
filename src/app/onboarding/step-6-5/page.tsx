'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/lib/onboarding-store'
import { Button } from '@/components/ui'

const ageMap: Record<string, number> = {
  '18–25': 22,
  '26–35': 30,
  '36–50': 43,
  '50+': 57,
}

const goalMultiplier: Record<string, number> = {
  lose: 0.8,
  maintain: 1,
  gain: 1.15,
}

export default function Step65() {
  const router = useRouter()
  const { weight_kg, height_cm, gender, age_range, goal, setField } = useOnboardingStore()

  const [weight, setWeight] = useState(weight_kg ?? '')
  const [height, setHeight] = useState(height_cm ?? '')
  const [calculated, setCalculated] = useState(false)
  const [kcal, setKcal] = useState(useOnboardingStore.getState().kcal_target ?? 0)
  const [protein, setProtein] = useState(useOnboardingStore.getState().protein_g ?? 0)
  const [fat, setFat] = useState(useOnboardingStore.getState().fat_g ?? 0)
  const [carbs, setCarbs] = useState(useOnboardingStore.getState().carbs_g ?? 0)

  function calculate() {
    const w = Number(weight)
    const h = Number(height)
    if (!w || !h) return

    setField('weight_kg', w)
    setField('height_cm', h)

    const age = ageMap[age_range || '26–35'] || 30
    const genderOffset = gender === 'Мужской' ? 5 : -161
    const bmr = 10 * w + 6.25 * h - 5 * age + genderOffset
    const tdee = bmr * 1.375
    const adjusted = Math.round(tdee * (goalMultiplier[goal || 'maintain'] || 1))

    const p = Math.round((adjusted * 0.25) / 4)
    const f = Math.round((adjusted * 0.30) / 9)
    const c = Math.round((adjusted * 0.45) / 4)

    setKcal(adjusted)
    setProtein(p)
    setFat(f)
    setCarbs(c)
    setCalculated(true)
  }

  function handleDone() {
    setField('kcal_target', kcal)
    setField('protein_g', protein)
    setField('fat_g', fat)
    setField('carbs_g', carbs)
    router.push('/onboarding/step-7')
  }

  const cards = [
    { label: 'Ккал', value: kcal, onChange: setKcal },
    { label: 'Белки', value: protein, onChange: setProtein },
    { label: 'Жиры', value: fat, onChange: setFat },
    { label: 'Углеводы', value: carbs, onChange: setCarbs },
  ]

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] justify-between">
      <div>
        <h1 className="font-display text-xl font-semibold mt-4">Твои параметры</h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block" style={{ color: '#666' }}>Вес (кг)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              className="w-full rounded-[10px] border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#993C1D]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block" style={{ color: '#666' }}>Рост (см)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              className="w-full rounded-[10px] border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#993C1D]"
            />
          </div>

          <Button variant="outline" fullWidth onClick={calculate}>
            Рассчитать
          </Button>
        </div>

        {calculated && (
          <div className="grid grid-cols-2 gap-3 mt-6">
            {cards.map((c) => (
              <div
                key={c.label}
                className="rounded-[12px] p-3 text-center"
                style={{ backgroundColor: '#FAECE7' }}
              >
                <p className="text-xs font-medium mb-1" style={{ color: '#993C1D' }}>{c.label}</p>
                <input
                  type="number"
                  value={c.value}
                  onChange={(e) => c.onChange(Number(e.target.value))}
                  className="w-full text-center text-lg font-bold bg-transparent outline-none"
                  style={{ color: '#993C1D' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full mt-8 pb-4">
        <Button fullWidth onClick={handleDone} disabled={!calculated}>
          Готово
        </Button>
      </div>
    </div>
  )
}
