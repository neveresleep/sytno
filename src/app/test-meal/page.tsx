'use client'

import { useState } from 'react'

interface Ingredient {
  name: string
  amount: string
  unit: string
}

interface MealResult {
  name: string
  cook_time: string
  ingredients: Ingredient[]
  recipe: string
  reason: string
}

export default function TestMealPage() {
  const [loading, setLoading] = useState(false)
  const [meal, setMeal] = useState<MealResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    setLoading(true)
    setError(null)
    setMeal(null)

    try {
      // 1. Generate week
      const postRes = await fetch('/api/generate-week', { method: 'POST' })
      const postData = await postRes.json()

      if (!postRes.ok) {
        throw new Error(postData.error || 'Ошибка генерации')
      }

      // 2. Fetch saved menu
      const getRes = await fetch('/api/generate-week')
      const getData = await getRes.json()

      if (!getRes.ok) {
        throw new Error(getData.error || 'Ошибка загрузки меню')
      }

      const sample = getData.meals?.mon?.breakfast as MealResult | undefined
      if (!sample) {
        throw new Error('Меню сгенерировано, но блюдо не найдено')
      }

      setMeal(sample)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: '#F8F5F2', fontFamily: 'Nunito, sans-serif' }}
    >
      <h1 className="text-xl font-bold mb-6">Тест генерации блюда</h1>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="text-white font-semibold px-6 py-3 disabled:opacity-50"
        style={{ backgroundColor: '#993C1D', borderRadius: 10 }}
      >
        {loading ? 'Генерируем...' : 'Сгенерировать блюдо'}
      </button>

      {loading && (
        <div className="flex items-center gap-3 mt-6 text-sm" style={{ color: '#666' }}>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Генерируем меню на неделю...
        </div>
      )}

      {error && (
        <p className="mt-6 text-sm font-medium" style={{ color: '#A32D2D' }}>
          {error}
        </p>
      )}

      {meal && (
        <div
          className="mt-6 p-5"
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <h2 className="text-lg font-bold mb-1">{meal.name}</h2>
          <p className="text-sm mb-4" style={{ color: '#888' }}>
            Время: {meal.cook_time}
          </p>

          <h3 className="text-sm font-semibold mb-2">Ингредиенты</h3>
          <ul className="list-disc list-inside text-sm mb-4 space-y-1" style={{ color: '#444' }}>
            {meal.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.name} — {ing.amount} {ing.unit}
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold mb-2">Рецепт</h3>
          <p className="text-sm whitespace-pre-line mb-4" style={{ color: '#444' }}>
            {meal.recipe}
          </p>

          <div
            className="text-sm p-3"
            style={{
              backgroundColor: '#FFF4EF',
              borderLeft: '3px solid #F0997B',
              borderRadius: '0 8px 8px 0',
              color: '#712B13',
            }}
          >
            {meal.reason}
          </div>
        </div>
      )}
    </div>
  )
}
