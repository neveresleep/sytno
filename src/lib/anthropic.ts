import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export type MealType = 'breakfast' | 'lunch' | 'dinner'

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface UserProfile {
  gender?: string
  age_range?: string
  region?: string
  goal?: string
  kcal_target?: number
  protein_g?: number
  fat_g?: number
  carbs_g?: number
  people_count?: number
  cook_frequency?: string
  allergies?: string[]
  conditions?: string[]
  disliked_products?: string
  liked_dish_types?: string[]
  disliked_dish_types?: string[]
}

export interface MealResult {
  name: string
  cook_time: string
  ingredients: { name: string; amount: string; unit: string }[]
  recipe: string
  reason: string
}

const dayNames: Record<DayKey, string> = {
  mon: 'Понедельник',
  tue: 'Вторник',
  wed: 'Среда',
  thu: 'Четверг',
  fri: 'Пятница',
  sat: 'Суббота',
  sun: 'Воскресенье',
}

const mealNames: Record<MealType, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
}

function v(value: unknown): string {
  if (value == null) return 'нет'
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'нет'
  return String(value) || 'нет'
}

export function buildSystemPrompt(
  user: UserProfile,
  day: DayKey,
  mealType: MealType,
  recentMeals: string[],
): string {
  return `Ты кулинарный помощник Сытно. Рекомендации основаны на науке о питании (ВОЗ, Миффлин-Сан Жеора).

ПРОФИЛЬ:
- Пол: ${v(user.gender)}, Возраст: ${v(user.age_range)}, Регион: ${v(user.region)}
- Цель: ${v(user.goal)}
- КБЖУ норма: ${v(user.kcal_target)}ккал / Б${v(user.protein_g)}г / Ж${v(user.fat_g)}г / У${v(user.carbs_g)}г
- На сколько человек: ${v(user.people_count)}
- Аллергии: ${v(user.allergies)}
- Заболевания: ${v(user.conditions)}
- Нелюбимые продукты: ${v(user.disliked_products)}
- Любимые типы: ${v(user.liked_dish_types)}
- Нежелательные типы: ${v(user.disliked_dish_types)}

ИСТОРИЯ последних 14 дней (не повторять эти блюда):
${recentMeals.length ? recentMeals.join(', ') : 'нет'}

День недели: ${dayNames[day]}, Приём пищи: ${mealNames[mealType]}

Предложи ОДНО блюдо, подходящее для региона и сезона. Верни только JSON без markdown:
{"name":"...","cook_time":"...","ingredients":[{"name":"...","amount":"...","unit":"..."}],"recipe":"пошаговый нумерованный рецепт","reason":"1-2 предложения почему подходит"}`
}

export { anthropic }
