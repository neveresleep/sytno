'use client'

type MealType = 'breakfast' | 'lunch' | 'dinner'

interface Meal {
  name: string
  cook_time: string
  ingredients: { name: string; amount: string; unit: string }[]
  recipe: string
  reason: string
}

interface MealCardProps {
  type: MealType
  meal?: Meal | null
  placeholder?: boolean
  loading?: boolean
}

const mealMeta: Record<MealType, { label: string; icon: string }> = {
  breakfast: { label: 'Завтрак', icon: '☀️' },
  lunch: { label: 'Обед', icon: '🍲' },
  dinner: { label: 'Ужин', icon: '🌙' },
}

export function MealCard({ type, meal, placeholder, loading }: MealCardProps) {
  const { label, icon } = mealMeta[type]

  // Skeleton
  if (loading) {
    return (
      <div
        className="flex-1 min-w-0 rounded-[12px] px-3 py-2.5"
        style={{ backgroundColor: '#F0EBE5', minHeight: 52 }}
      >
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-xs">{icon}</span>
          <span className="text-[11px] font-medium" style={{ color: '#999' }}>{label}</span>
        </div>
        <div className="h-3 rounded animate-pulse" style={{ backgroundColor: '#E5E0DA', width: '75%' }} />
      </div>
    )
  }

  // Placeholder (no data)
  if (placeholder || !meal) {
    return (
      <div
        className="flex-1 min-w-0 rounded-[12px] px-3 py-2.5"
        style={{ backgroundColor: '#F0EBE5', minHeight: 52 }}
      >
        <div className="flex items-center gap-1">
          <span className="text-xs">{icon}</span>
          <span className="text-[11px] font-medium" style={{ color: '#999' }}>{label}</span>
        </div>
        {!placeholder && (
          <p className="text-[13px] font-medium" style={{ color: '#BBB' }}>—</p>
        )}
      </div>
    )
  }

  // Loaded with data
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
        <span className="text-[11px] font-medium" style={{ color: '#999' }}>{label}</span>
      </div>
      <p className="text-[13px] font-medium truncate" style={{ color: '#1A1A1A' }}>
        {meal.name}
      </p>
    </div>
  )
}

export type { Meal, MealType }
