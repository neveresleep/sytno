'use client'

import { useState } from 'react'
import { signOut } from '@/app/auth/actions'

export function LogoutButton() {
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await signOut()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 text-sm font-medium rounded-[10px] transition-opacity disabled:opacity-50"
      style={{
        border: '1.5px solid #993C1D',
        color: '#993C1D',
        backgroundColor: 'transparent',
      }}
    >
      {loading ? 'Выход...' : 'Выйти'}
    </button>
  )
}
