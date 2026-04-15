'use client'

import { useState } from 'react'
import { signInWithEmail, signUpWithEmail } from '@/app/auth/actions'

export function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setLoading(true)

    const action = mode === 'login' ? signInWithEmail : signUpWithEmail
    const result = await action(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex rounded-[10px] p-1 mb-6" style={{ backgroundColor: '#F0EBE5' }}>
        <button
          type="button"
          onClick={() => { setMode('login'); setError(null) }}
          className="flex-1 py-2 text-sm font-medium rounded-[8px] transition-colors"
          style={{
            backgroundColor: mode === 'login' ? '#fff' : 'transparent',
            color: mode === 'login' ? '#993C1D' : '#999',
          }}
        >
          Вход
        </button>
        <button
          type="button"
          onClick={() => { setMode('register'); setError(null) }}
          className="flex-1 py-2 text-sm font-medium rounded-[8px] transition-colors"
          style={{
            backgroundColor: mode === 'register' ? '#fff' : 'transparent',
            color: mode === 'register' ? '#993C1D' : '#999',
          }}
        >
          Регистрация
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className="rounded-[10px] px-4 py-3 mb-4 text-sm"
          style={{ backgroundColor: '#FEF0F0', color: '#A32D2D' }}
        >
          {error}
        </div>
      )}

      {/* Form */}
      <form action={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-[10px] border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#993C1D] transition-colors"
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          required
          minLength={6}
          className="w-full rounded-[10px] border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#993C1D] transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[10px] py-3 text-sm font-medium text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: '#993C1D' }}
        >
          {loading
            ? 'Загрузка...'
            : mode === 'login'
              ? 'Войти'
              : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}
