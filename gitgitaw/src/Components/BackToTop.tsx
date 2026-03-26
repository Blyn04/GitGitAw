import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUp } from 'lucide-react'

const MAIN_SCROLL_ID = 'main-scroll'

export function useBackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const main = document.getElementById(MAIN_SCROLL_ID)
    if (!main) return
    const check = () => {
      setShow(main.scrollTop > 300)
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
  return createPortal(
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className={`back-to-top-btn${show ? ' back-to-top-btn--visible' : ''}`}
    >
      <ArrowUp size={20} />
    </button>,
    document.body,
  )
}
