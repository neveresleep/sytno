'use client'

type MealType = 'breakfast' | 'lunch' | 'dinner'

interface MealCardProps {
  type: MealType
  name: string
}

const mealMeta: Record<MealType, { label: string; icon: string }> = {
  breakfast: { label: 'Завтрак', icon: '☀️' },
  lunch: { label: 'Обед', icon: '🍲' },
  dinner: { label: 'Ужин', icon: '🌙' },
}

export function MealCard({ type, name }: MealCardProps) {
  const { label, icon } = mealMeta[type]

  return (
    <div
      className="flex-1 min-w-0 rounded-[12px] px-3 py-2.5"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-xs">{icon}</span>
        <span className="text-[11px] font-medium" style={{ color: '#999' }}>
          {label}
        </span>
      </div>
      <p
        className="text-[13px] font-medium truncate"
        style={{ color: '#1A1A1A' }}
      >
        {name}
      </p>
    </div>
  )
}
