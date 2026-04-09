'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useOnboardingStore } from '@/lib/onboarding-store'

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export default function Step7() {
  const router = useRouter()
  const [completedDays, setCompletedDays] = useState(0)
  const store = useOnboardingStore()

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedDays((prev) => {
        if (prev >= 7) {
          clearInterval(interval)
          return 7
        }
        return prev + 1
      })
    }, 600)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (completedDays < 7) return

    async function saveAndRedirect() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        await supabase.from('users').upsert({
          id: user.id,
          gender: store.gender,
          age_range: store.age_range,
          region: store.region,
          goal: store.goal,
          weight_kg: store.weight_kg,
          height_cm: store.height_cm,
          kcal_target: store.kcal_target,
          protein_g: store.protein_g,
          fat_g: store.fat_g,
          carbs_g: store.carbs_g,
          people_count: store.people_count,
          cook_frequency: store.cook_frequency,
          allergies: store.allergies,
          conditions: store.conditions,
          disliked_products: store.disliked_products,
          liked_dish_types: store.liked_dish_types,
          disliked_dish_types: store.disliked_dish_types,
        })
      }

      store.reset()
      router.push('/nutrition')
    }

    const timeout = setTimeout(saveAndRedirect, 500)
    return () => clearTimeout(timeout)
  }, [completedDays, store, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
      <h1 className="font-display text-xl font-semibold mb-8">Составляем меню</h1>

      <div className="space-y-3 w-full max-w-[200px]">
        {days.map((day, i) => (
          <div
            key={day}
            className="flex items-center justify-between text-sm font-medium transition-opacity"
            style={{ opacity: i < completedDays ? 1 : 0.3 }}
          >
            <span>{day}</span>
            {i < completedDays && (
              <span style={{ color: '#993C1D' }}>✓</span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm" style={{ color: '#888' }}>
        Учитываем твои вкусы и цели...
      </p>
    </div>
  )
}
