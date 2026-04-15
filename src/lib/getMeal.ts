import { createClient } from '@/lib/supabase/server'
import type { UserProfile, MealType, MealResult } from '@/lib/anthropic'

export async function getMeal(
  user: UserProfile,
  mealType: MealType,
  recentMealNames: string[],
): Promise<MealResult> {
  const supabase = await createClient()

  // 1. Search existing recipes
  let query = supabase
    .from('recipes')
    .select('*')
    .contains('meal_types', [mealType])
    .contains('allergens_free', user.allergies ?? [])

  if (recentMealNames.length) {
    query = query.not('name', 'in', `(${recentMealNames.map((n) => `"${n}"`).join(',')})`)
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

  // 3. No match — call Claude API via fetch
  const systemPrompt = `Ты кулинарный помощник Сытно. Пол: ${user.gender ?? 'нет'}, возраст: ${user.age_range ?? 'нет'}, регион: ${user.region ?? 'нет'}, цель: ${user.goal ?? 'нет'}, КБЖУ: ${user.kcal_target ?? '?'}ккал/Б${user.protein_g ?? '?'}/Ж${user.fat_g ?? '?'}/У${user.carbs_g ?? '?'}, на ${user.people_count ?? 1} чел. Аллергии: ${(user.allergies ?? []).join(', ') || 'нет'}. Нелюбимые продукты: ${user.disliked_products || 'нет'}. Не повторять: ${recentMealNames.join(', ') || 'нет'}. Приём пищи: ${mealType}. Верни одно блюдо строго в JSON без markdown: {"name":"","cook_time":"","ingredients":[{"name":"","amount":"","unit":""}],"recipe":"","reason":""}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{ role: 'user', content: systemPrompt }],
    }),
  })

  if (!res.ok) {
    throw new Error(`Claude API error: ${res.status}`)
  }

  const data = await res.json()
  const meal: MealResult = JSON.parse(data.content[0].text)

  // 4. Save to recipes
  await supabase.from('recipes').insert({
    name: meal.name,
    data: meal,
    meal_types: [mealType],
    allergens_free: user.allergies ?? [],
    conditions: user.conditions ?? [],
    goal: user.goal ? [user.goal] : [],
    region: user.region,
    use_count: 1,
  })

  return meal
}
