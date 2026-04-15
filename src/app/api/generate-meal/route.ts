import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getMeal } from '@/lib/getMeal'
import type { UserProfile, MealResult } from '@/lib/anthropic'

// TODO: временный GET — удалить после тестирования
export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase.from('users').select('id').limit(1).single()
  return Response.json({ userId: data?.id })
}

interface RequestBody {
  userId: string
  day: string
  weekStart: string
}

export async function POST(request: Request) {
  try {
    const { userId, day, weekStart } = (await request.json()) as RequestBody

    if (!userId || !day || !weekStart) {
      return NextResponse.json({ error: 'Missing userId, day, or weekStart' }, { status: 400 })
    }

    const supabase = await createClient()

    // 1. Load user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = profile as UserProfile

    // 2. Load recent meals (last 14 days)
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()

    const { data: recentMenus } = await supabase
      .from('weekly_menus')
      .select('meals')
      .eq('user_id', userId)
      .gte('created_at', fourteenDaysAgo)

    const recentMealNames: string[] = []
    if (recentMenus?.length) {
      for (const menu of recentMenus) {
        const meals = menu.meals as Record<string, Record<string, MealResult>>
        for (const dayMeals of Object.values(meals)) {
          for (const meal of Object.values(dayMeals)) {
            if (meal?.name) recentMealNames.push(meal.name)
          }
        }
      }
    }

    // 3. Generate 3 meals in parallel
    const [breakfast, lunch, dinner] = await Promise.all([
      getMeal(user, 'breakfast', recentMealNames),
      getMeal(user, 'lunch', recentMealNames),
      getMeal(user, 'dinner', recentMealNames),
    ])

    return NextResponse.json({ breakfast, lunch, dinner })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
