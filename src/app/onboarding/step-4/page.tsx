'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/lib/onboarding-store'
import { Button, Chip } from '@/components/ui'

export default function Step4() {
  const router = useRouter()
  const { liked_dish_types, disliked_dish_types, setField } = useOnboardingStore()
  const [likedInput, setLikedInput] = useState('')
  const [dislikedInput, setDislikedInput] = useState('')

  function addLiked(raw: string) {
    const val = raw.trim()
    if (!val || liked_dish_types.includes(val)) return
    setField('liked_dish_types', [...liked_dish_types, val])
    setLikedInput('')
  }

  function removeLiked(tag: string) {
    setField('liked_dish_types', liked_dish_types.filter((t) => t !== tag))
  }

  function addDisliked(raw: string) {
    const val = raw.trim()
    if (!val || disliked_dish_types.includes(val)) return
    setField('disliked_dish_types', [...disliked_dish_types, val])
    setDislikedInput('')
  }

  function removeDisliked(tag: string) {
    setField('disliked_dish_types', disliked_dish_types.filter((t) => t !== tag))
  }

  function handleKey(
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string,
    add: (v: string) => void,
  ) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add(value)
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void,
    add: (v: string) => void,
  ) {
    const v = e.target.value
    if (v.includes(',')) {
      add(v.replace(',', ''))
    } else {
      setter(v)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] justify-between">
      <div>
        <h1 className="font-display text-xl font-semibold mt-4">Твои вкусы</h1>

        {/* Люблю */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Люблю</p>
        <input
          value={likedInput}
          onChange={(e) => handleChange(e, setLikedInput, addLiked)}
          onKeyDown={(e) => handleKey(e, likedInput, addLiked)}
          placeholder="Введите блюдо и нажмите Enter"
          className="w-full rounded-[10px] border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#993C1D] mb-3"
        />
        <div className="flex flex-wrap gap-2">
          {liked_dish_types.map((tag) => (
            <Chip key={tag} label={tag} variant="active" onRemove={() => removeLiked(tag)} />
          ))}
        </div>

        {/* Не хочу */}
        <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#666' }}>Не хочу</p>
        <input
          value={dislikedInput}
          onChange={(e) => handleChange(e, setDislikedInput, addDisliked)}
          onKeyDown={(e) => handleKey(e, dislikedInput, addDisliked)}
          placeholder="Введите блюдо и нажмите Enter"
          className="w-full rounded-[10px] border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#993C1D] mb-3"
        />
        <div className="flex flex-wrap gap-2">
          {disliked_dish_types.map((tag) => (
            <Chip key={tag} label={tag} variant="danger" onRemove={() => removeDisliked(tag)} />
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
