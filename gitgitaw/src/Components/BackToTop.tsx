import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const MAIN_SCROLL_ID = 'main-scroll'

export function useBackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const main = document.getElementById(MAIN_SCROLL_ID)
    if (!main) return
    const check = () => {
      const scrollTop = main.scrollTop
      const scrollHeight = main.scrollHeight - main.clientHeight
      setShow(scrollHeight > 200 && scrollTop >= scrollHeight - 120)
    }
    main.addEventListener('scroll', check, { passive: true })
    check()
    return () => main.removeEventListener('scroll', check)
  }, [])

  const scrollToTop = () => {
    document.getElementById(MAIN_SCROLL_ID)?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { showBackToTop: show, scrollToTop }
}

export function BackToTopButton({ show, onClick }: { show: boolean; onClick: () => void }) {
  if (!show) return null
  const button = (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: 20,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      ↑
    </button>
  )
  return createPortal(button, document.body)
}
