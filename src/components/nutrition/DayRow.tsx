'use client'

import { MealCard } from './MealCard'
import type { Meal } from './MealCard'

interface DayMeals {
  breakfast: Meal
  lunch: Meal
  dinner: Meal
}

interface DayRowProps {
  dayLabel: string
  dateNum: number
  meals?: DayMeals | null
  isToday?: boolean
  placeholder?: boolean
  loading?: boolean
}

export function DayRow({
  dayLabel,
  dateNum,
  meals,
  isToday = false,
  placeholder = false,
  loading = false,
}: DayRowProps) {
  return (
    <div
      className="flex gap-3 px-5 py-3 items-start"
      style={{
        backgroundColor: isToday ? '#FFF4EF' : 'transparent',
        borderRadius: isToday ? 16 : 0,
        marginLeft: isToday ? -4 : 0,
        marginRight: isToday ? -4 : 0,
        paddingLeft: isToday ? 24 : 20,
        paddingRight: isToday ? 24 : 20,
      }}
    >
      <div className="flex flex-col items-center pt-1" style={{ minWidth: 32 }}>
        <span
          className="text-[11px] font-semibold uppercase"
          style={{ color: isToday ? '#993C1D' : '#999' }}
        >
          {dayLabel}
        </span>
        <span
          className="text-lg font-bold leading-tight"
          style={{ color: isToday ? '#993C1D' : '#1A1A1A' }}
        >
          {dateNum}
        </span>
      </div>

      <div className="flex-1 flex gap-2 min-w-0">
        <MealCard type="breakfast" meal={meals?.breakfast} placeholder={placeholder} loading={loading} />
        <MealCard type="lunch" meal={meals?.lunch} placeholder={placeholder} loading={loading} />
        <MealCard type="dinner" meal={meals?.dinner} placeholder={placeholder} loading={loading} />
      </div>
    </div>
  )
}

export type { DayMeals }
