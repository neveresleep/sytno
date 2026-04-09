'use client'

import { useState } from 'react'
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '@/app/auth/actions'

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

  async function handleGoogle() {
    setError(null)
    const result = await signInWithGoogle()

    if (result?.error) {
      setError(result.error)
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

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">или</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-2 rounded-[10px] border border-gray-200 py-3 text-sm font-medium transition-colors hover:bg-gray-50"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
          <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
        </svg>
        Продолжить с Google
      </button>
    </div>
  )
}
