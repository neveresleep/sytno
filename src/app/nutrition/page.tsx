'use client'

import { BottomNav } from '@/components/ui/BottomNav'
import { WeekNav } from '@/components/nutrition/WeekNav'
import { DayRow } from '@/components/nutrition/DayRow'

const mockWeek = [
  { day: 'Пн', date: 14, breakfast: 'Овсянка с ягодами', lunch: 'Куриный суп', dinner: 'Греческий салат' },
  { day: 'Вт', date: 15, breakfast: 'Сырники со сметаной', lunch: 'Паста болоньезе', dinner: 'Запечённая рыба' },
  { day: 'Ср', date: 16, breakfast: 'Омлет с овощами', lunch: 'Борщ с чесноком', dinner: 'Тушёные овощи' },
  { day: 'Чт', date: 17, breakfast: 'Гранола с йогуртом', lunch: 'Плов с курицей', dinner: 'Цезарь с креветками' },
  { day: 'Пт', date: 18, breakfast: 'Блинчики с творогом', lunch: 'Том ям с тофу', dinner: 'Стейк с брокколи' },
  { day: 'Сб', date: 19, breakfast: 'Авокадо-тост', lunch: 'Харчо с говядиной', dinner: 'Ризотто с грибами' },
  { day: 'Вс', date: 20, breakfast: 'Каша пшённая', lunch: 'Лагман домашний', dinner: 'Рататуй с сыром' },
]

const TODAY_INDEX = 1 // Вторник

export default function NutritionPage() {
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
        <span
          className="font-display text-xl font-bold"
          style={{ color: '#993C1D' }}
        >
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
      <WeekNav />

      {/* Day rows */}
      <div className="flex flex-col gap-1 mt-2">
        {mockWeek.map((row, i) => (
          <DayRow
            key={row.day}
            dayLabel={row.day}
            dateNum={row.date}
            breakfast={row.breakfast}
            lunch={row.lunch}
            dinner={row.dinner}
            isToday={i === TODAY_INDEX}
          />
        ))}
      </div>

      {/* Fixed bottom button */}
      <div
        className="fixed left-0 right-0 px-5"
        style={{
          bottom: 'calc(80px + env(safe-area-inset-bottom))',
        }}
      >
        <button
          className="w-full py-3.5 text-white font-semibold text-sm active:scale-95 transition-transform"
          style={{
            backgroundColor: '#993C1D',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(153,60,29,0.3)',
          }}
        >
          Сгенерировать питание на неделю
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
