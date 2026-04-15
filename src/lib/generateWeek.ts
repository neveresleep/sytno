import { createClient } from '@/lib/supabase/server'
import { generateMeal } from '@/lib/generateMeal'
import type { UserProfile, DayKey, MealType, MealResult } from '@/lib/anthropic'

const DAYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const MEALS: MealType[] = ['breakfast', 'lunch', 'dinner']

type DayMeals = Record<MealType, MealResult>
type WeekMeals = Record<DayKey, DayMeals>

function getMonday(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + diff)
  return monday.toISOString().slice(0, 10)
}

export async function generateWeek(user: UserProfile, userId: string): Promise<void> {
  const supabase = await createClient()

  // 1. Recent meals from last 14 days
  const fourteenDaysAgo = new Date()
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
  const since = fourteenDaysAgo.toISOString().slice(0, 10)

  const { data: recentRows } = await supabase
    .from('weekly_menus')
    .select('meals')
    .eq('user_id', userId)
    .gte('week_start', since)

  const recentMeals: string[] = []
  if (recentRows) {
    for (const row of recentRows) {
      const meals = row.meals as Record<string, Record<string, { name?: string }>> | null
      if (!meals) continue
      for (const day of Object.values(meals)) {
        for (const meal of Object.values(day)) {
          if (meal?.name) recentMeals.push(meal.name)
        }
      }
    }
  }

  // 2. Week start (Monday)
  const weekStart = getMonday()

  // 3. Generate all meals in parallel: 7 days × 3 meals
  const dayResults = await Promise.all(
    DAYS.map(async (day) => {
      const mealResults = await Promise.all(
        MEALS.map((mealType) => generateMeal(user, day, mealType, recentMeals)),
      )
      return [day, Object.fromEntries(MEALS.map((m, i) => [m, mealResults[i]]))] as const
    }),
  )

  // 4. Assemble meals object
  const meals = Object.fromEntries(dayResults) as WeekMeals

  // 5. Upsert into weekly_menus
  await supabase
    .from('weekly_menus')
    .upsert(
      { user_id: userId, week_start: weekStart, meals },
      { onConflict: 'user_id,week_start' },
    )
}
