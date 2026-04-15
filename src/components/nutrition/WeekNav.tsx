'use client'

export function WeekNav() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full"
        style={{ backgroundColor: '#F0EBE5' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
        Эта неделя
      </span>
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full"
        style={{ backgroundColor: '#F0EBE5' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
