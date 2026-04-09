'use client'

interface ChipProps {
  label: string
  variant?: 'default' | 'active' | 'danger'
  onClick?: () => void
  onRemove?: () => void
}

const variantStyles = {
  default: {
    backgroundColor: '#F0EBE5',
    color: '#666666',
    border: 'none',
  },
  active: {
    backgroundColor: '#FAECE7',
    color: '#712B13',
    border: '1px solid #F0997B',
  },
  danger: {
    backgroundColor: '#FEF0F0',
    color: '#A32D2D',
    border: 'none',
  },
}

export function Chip({ label, variant = 'default', onClick, onRemove }: ChipProps) {
  const style = variantStyles[variant]

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full text-sm font-medium cursor-default"
      style={{
        ...style,
        padding: '6px 12px',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 500,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 leading-none opacity-60 hover:opacity-100"
          style={{ color: style.color }}
        >
          ×
        </button>
      )}
    </span>
  )
}
