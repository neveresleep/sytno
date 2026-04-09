'use client'

import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/lib/onboarding-store'
import { Button, Chip } from '@/components/ui'

const ageRanges = ['18–25', '26–35', '36–50', '50+']
const peopleCounts = ['1', '2', '3', '4+']

const regions = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград',
  'Краснодар', 'Тюмень', 'Саратов', 'Тольятти', 'Ижевск',
]

export default function Step3() {
  const router = useRouter()
  const { gender, age_range, region, people_count, setField } = useOnboardingStore()

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] justify-between">
      <div>
        <h1 className="font-display text-xl font-semibold mt-4">Расскажи о себе</h1>

        {/* Пол */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Пол</p>
        <div className="flex gap-3">
          {(['Женский', 'Мужской'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setField('gender', g)}
              className="flex-1 py-3 rounded-[12px] text-sm font-medium border-2 transition-colors"
              style={{
                borderColor: gender === g ? '#993C1D' : '#F0EBE5',
                backgroundColor: gender === g ? '#FAECE7' : '#FFF',
                color: gender === g ? '#993C1D' : '#666',
              }}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Возраст */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Возраст</p>
        <div className="flex flex-wrap gap-2">
          {ageRanges.map((a) => (
            <Chip
              key={a}
              label={a}
              variant={age_range === a ? 'active' : 'default'}
              onClick={() => setField('age_range', a)}
            />
          ))}
        </div>

        {/* Регион */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Регион</p>
        <select
          value={region || ''}
          onChange={(e) => setField('region', e.target.value)}
          className="w-full rounded-[10px] border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#993C1D] bg-white"
        >
          <option value="">Выбери город</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {/* На сколько человек */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>На сколько человек</p>
        <div className="flex flex-wrap gap-2">
          {peopleCounts.map((p) => {
            const val = p === '4+' ? 4 : Number(p)
            return (
              <Chip
                key={p}
                label={p}
                variant={people_count === val ? 'active' : 'default'}
                onClick={() => setField('people_count', val)}
              />
            )
          })}
        </div>
      </div>

      <div className="w-full mt-8 pb-4">
        <Button fullWidth onClick={() => router.push('/onboarding/step-4')}>
          Далее →
        </Button>
      </div>
    </div>
  )
}
