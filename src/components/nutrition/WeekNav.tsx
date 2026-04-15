'use client'

interface WeekNavProps {
  offset: number
  onPrev: () => void
  onNext: () => void
}

const labels: Record<number, string> = {
  [-1]: 'Прошлая неделя',
  0: 'Эта неделя',
  1: 'Следующая неделя',
}

export function WeekNav({ offset, onPrev, onNext }: WeekNavProps) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full disabled:opacity-30"
        style={{ backgroundColor: '#F0EBE5' }}
        disabled={offset <= -1}
        onClick={onPrev}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
        {labels[offset] ?? 'Эта неделя'}
      </span>
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full disabled:opacity-30"
        style={{ backgroundColor: '#F0EBE5' }}
        disabled={offset >= 1}
        onClick={onNext}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
