import { createClient } from '@/lib/supabase/server'
import {
  anthropic,
  buildSystemPrompt,
  type UserProfile,
  type DayKey,
  type MealType,
  type MealResult,
} from '@/lib/anthropic'

export async function generateMeal(
  user: UserProfile,
  day: DayKey,
  mealType: MealType,
  recentMeals: string[],
): Promise<MealResult> {
  const supabase = await createClient()

  // 1. Search existing recipes
  let query = supabase
    .from('recipes')
    .select('*')
    .contains('meal_types', [mealType])

  if (user.allergies?.length) {
    query = query.contains('allergens_free', user.allergies)
  }

  if (user.conditions?.length) {
    query = query.contains('conditions', user.conditions)
  }

  if (recentMeals.length) {
    query = query.not('name', 'in', `(${recentMeals.map((n) => `"${n}"`).join(',')})`)
  }

  const { data: recipes } = await query
    .order('rating', { ascending: false })
    .limit(20)

  // 2. If found — pick random, bump use_count, return
  if (recipes?.length) {
    const pick = recipes[Math.floor(Math.random() * recipes.length)]

    await supabase
      .from('recipes')
      .update({ use_count: (pick.use_count ?? 0) + 1 })
      .eq('id', pick.id)

    return pick.data as MealResult
  }

  // 3. No match — call Claude
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1000,
    messages: [
      { role: 'user', content: buildSystemPrompt(user, day, mealType, recentMeals) },
    ],
  })

  let meal: MealResult
  try {
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    meal = JSON.parse(text) as MealResult
  } catch {
    throw new Error('Failed to parse Claude response as JSON')
  }

  // 4. Save to recipes
  await supabase.from('recipes').insert({
    name: meal.name,
    data: meal,
    meal_types: [mealType],
    conditions: user.conditions ?? [],
    allergens_free: user.allergies ?? [],
    goal: user.goal ? [user.goal] : [],
    region: user.region,
    use_count: 1,
  })

  // 5. Return
  return meal
}
