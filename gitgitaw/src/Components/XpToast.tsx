import React from 'react'

interface XpToastProps {
  xp: number
  visible: boolean
}

export function XpToast({ xp, visible }: XpToastProps) {
  if (!visible) return null
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1001,
        background: '#e3b34122',
        border: '1px solid #e3b341',
        borderRadius: 20,
        padding: '6px 18px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 15,
        fontWeight: 700,
        color: '#e3b341',
        animation: 'float-up 1.2s ease forwards',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      +{xp} XP
    </div>
  )
}
