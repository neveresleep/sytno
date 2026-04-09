'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/lib/onboarding-store'
import { Button, Chip } from '@/components/ui'

const dishTypes = [
  'Супы', 'Салаты', 'Паста', 'Каши', 'Мясные блюда',
  'Рыбные блюда', 'Выпечка', 'Азиатская кухня', 'Средиземноморская',
]

export default function Step4() {
  const router = useRouter()
  const { liked_dish_types, disliked_dish_types, setField } = useOnboardingStore()
  const [dislikedInput, setDislikedInput] = useState('')
  const dislikedProducts = useOnboardingStore((s) => s.disliked_products)
  const dislikedList = dislikedProducts ? dislikedProducts.split(',').filter(Boolean) : []

  function toggleLiked(type: string) {
    const next = liked_dish_types.includes(type)
      ? liked_dish_types.filter((t) => t !== type)
      : [...liked_dish_types, type]
    setField('liked_dish_types', next)
  }

  function toggleDisliked(type: string) {
    const next = disliked_dish_types.includes(type)
      ? disliked_dish_types.filter((t) => t !== type)
      : [...disliked_dish_types, type]
    setField('disliked_dish_types', next)
  }

  function addDislikedProduct() {
    const val = dislikedInput.trim()
    if (!val) return
    const next = [...dislikedList, val].join(',')
    setField('disliked_products', next)
    setDislikedInput('')
  }

  function removeDislikedProduct(product: string) {
    const next = dislikedList.filter((p) => p !== product).join(',') || null
    setField('disliked_products', next)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] justify-between">
      <div>
        <h1 className="font-display text-xl font-semibold mt-4">Твои вкусы</h1>

        {/* Люблю готовить */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Люблю готовить</p>
        <div className="flex flex-wrap gap-2">
          {dishTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              variant={liked_dish_types.includes(type) ? 'active' : 'default'}
              onClick={() => toggleLiked(type)}
            />
          ))}
        </div>

        {/* Не хочу */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Не хочу</p>
        <div className="flex flex-wrap gap-2">
          {dishTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              variant={disliked_dish_types.includes(type) ? 'danger' : 'default'}
              onClick={() => toggleDisliked(type)}
            />
          ))}
        </div>

        {/* Не ем / не люблю */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Не ем / не люблю</p>
        <div className="flex gap-2 mb-3">
          <input
            value={dislikedInput}
            onChange={(e) => setDislikedInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addDislikedProduct()}
            placeholder="Например, кинза"
            className="flex-1 rounded-[10px] border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#993C1D]"
          />
          <Button size="sm" onClick={addDislikedProduct}>+</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {dislikedList.map((p) => (
            <Chip key={p} label={p} variant="danger" onRemove={() => removeDislikedProduct(p)} />
          ))}
        </div>
      </div>

      <div className="w-full mt-8 pb-4">
        <Button fullWidth onClick={() => router.push('/onboarding/step-5')}>
          Далее →
        </Button>
      </div>
    </div>
  )
}
