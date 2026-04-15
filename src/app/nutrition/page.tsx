'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { startOfWeek, addWeeks, addDays, isToday as isDayToday, getDate, format } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import { BottomNav } from '@/components/ui/BottomNav'
import { WeekNav } from '@/components/nutrition/WeekNav'
import { DayRow } from '@/components/nutrition/DayRow'
import type { Meal } from '@/components/nutrition/MealCard'
import type { DayMeals } from '@/components/nutrition/DayRow'

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
type WeekMeals = Record<DayKey, DayMeals>

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const
const DAY_KEYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export default function NutritionPage() {
  const router = useRouter()
  const [weekOffset, setWeekOffset] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [weekMeals, setWeekMeals] = useState<WeekMeals | null>(null)

  const weekStart = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 })
  const weekStartStr = format(weekStart, 'yyyy-MM-dd')

  const days = DAY_LABELS.map((label, i) => {
    const date = addDays(weekStart, i)
    return { label, dateNum: getDate(date), isToday: weekOffset === 0 && isDayToday(date) }
  })

  const isPast = weekOffset === -1
  const isNext = weekOffset === 1

  // Auth check
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/auth')
      } else {
        setUserId(session.user.id)
      }
    })
  }, [router])

  // Load week meals
  const loadWeek = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    setWeekMeals(null)

    const supabase = createClient()
    const { data } = await supabase
      .from('weekly_menus')
      .select('meals')
      .eq('user_id', userId)
      .eq('week_start', weekStartStr)
      .single()

    setWeekMeals((data?.meals as WeekMeals) ?? null)
    setLoading(false)
  }, [userId, weekStartStr])

  useEffect(() => {
    loadWeek()
  }, [loadWeek])

  const hasData = weekMeals !== null

  return (
    <div className="min-h-screen pb-36" style={{ backgroundColor: '#F8F5F2' }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-5"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 12px)',
          paddingBottom: 12,
        }}
      >
        <span className="font-display text-xl font-bold" style={{ color: '#993C1D' }}>
          сытно
        </span>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: '#FAECE7', color: '#993C1D' }}
        >
          АК
        </div>
      </header>

      {/* Week navigation */}
      <WeekNav
        offset={weekOffset}
        onPrev={() => setWeekOffset((o) => Math.max(o - 1, -1))}
        onNext={() => setWeekOffset((o) => Math.min(o + 1, 1))}
      />

      {/* Past week banner */}
      {isPast && (
        <div
          className="mx-5 mb-3 px-4 py-2.5 text-sm font-medium rounded-[10px]"
          style={{ backgroundColor: '#FAECE7', color: '#993C1D' }}
        >
          Только просмотр · AI учитывает
        </div>
      )}

      {/* Day rows */}
      <div
        className="flex flex-col gap-1 mt-2"
        style={{ opacity: isPast ? 0.6 : 1 }}
      >
        {days.map((day, i) => (
          <DayRow
            key={day.label}
            dayLabel={day.label}
            dateNum={day.dateNum}
            meals={weekMeals?.[DAY_KEYS[i]] ?? null}
            isToday={day.isToday}
            placeholder={!loading && !hasData && isNext}
            loading={loading}
          />
        ))}
      </div>

      {/* Fixed bottom button */}
      {!isPast && (
        <div
          className="fixed left-0 right-0 px-5"
          style={{ bottom: 'calc(80px + env(safe-area-inset-bottom))' }}
        >
          <button
            className="w-full py-3.5 text-white font-semibold text-sm active:scale-95 transition-transform"
            style={{
              backgroundColor: '#993C1D',
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(153,60,29,0.3)',
            }}
          >
            {isNext ? 'Сгенерировать питание' : 'Сгенерировать питание на неделю'}
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
