'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/tastes', label: 'Вкусы', icon: HeartIcon },
  { href: '/nutrition', label: 'Питание', icon: KnifeForkIcon, center: true },
  { href: '/products', label: 'Продукты', icon: ShoppingBagIcon },
  { href: '/profile', label: 'Профиль', icon: UserIcon },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white z-50"
      style={{
        borderTop: '1px solid #F0EBE5',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-end justify-around h-16">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href)
          const color = active ? '#993C1D' : '#BBB'

          if (tab.center) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center -mt-4"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: '#993C1D' }}
                >
                  <tab.icon color="#FFFFFF" size={24} />
                </div>
                <span
                  className="text-[10px] mt-1 font-medium"
                  style={{ color }}
                >
                  {tab.label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center pb-2"
            >
              <tab.icon color={color} size={22} />
              <span
                className="text-[10px] mt-1 font-medium"
                style={{ color }}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

function HeartIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function KnifeForkIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}

function ShoppingBagIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function UserIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  )
}
