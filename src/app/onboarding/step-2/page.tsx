'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui'

export default function Step2() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSignUp() {
    setError(null)
    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/onboarding/step-3')
  }

  async function handleGoogle() {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) setError(error.message)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] justify-between">
      <div>
        <h1 className="font-display text-xl font-semibold mt-4">Создай аккаунт</h1>

        <div className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[10px] border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#993C1D]"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full rounded-[10px] border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#993C1D]"
            />
          </div>

          {error && (
            <p className="text-xs" style={{ color: '#A32D2D' }}>{error}</p>
          )}

          <Button fullWidth onClick={handleSignUp} disabled={loading}>
            {loading ? 'Загрузка...' : 'Продолжить'}
          </Button>
        </div>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">или</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Button variant="outline" fullWidth onClick={handleGoogle}>
          Войти через Google
        </Button>
      </div>
    </div>
  )
}
