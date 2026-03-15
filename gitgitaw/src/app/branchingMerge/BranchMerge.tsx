import React from 'react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'

const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

export default function BranchMerge() {
  const { showBackToTop, scrollToTop } = useBackToTop()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, padding: '48px 56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...sans, fontSize: 13 }}>
        <span style={{ color: 'var(--accent-dim)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>Branching & Merging</span>
      </div>

      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h1 style={{ ...sans, fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Branching & Merging
        </h1>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Matuto kung paano gumawa ng branches at pagsamahin ang mga changes gamit ang Git.
        </p>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Coming soon
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          Ang lesson na ito ay ilalagay dito. Balik ka mamaya o magpatuloy sa ibang module.
        </p>
      </section>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
