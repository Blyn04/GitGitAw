import React, { useEffect, useRef, useState } from 'react'
import { Rocket, Flag, Code2, GraduationCap, Zap, Wrench, Monitor, GitCommit, Upload, Users } from 'lucide-react'
import Footer from '../../Components/Footer'

/** Attaches IntersectionObserver to add "is-visible" when element enters viewport */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

/** Reveal each direct child of a container with staggered delay */
function useRevealChildren(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    children.forEach((child, i) => {
      child.classList.add('reveal', `reveal-d${Math.min(i + 1, 5)}`)
    })
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach(child => child.classList.add('is-visible'))
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <QuickPathSection />
      <Footer />
    </div>
  )
}

// ── Terminal typewriter ────────────────────────────────────────────────

type TermLine = { text: string; type: 'cmd' | 'out' | 'gap' }

const TERMINAL_SCRIPT: TermLine[] = [
  { text: '$ git init',                                               type: 'cmd' },
  { text: 'Initialized empty Git repository in ~/my-project',        type: 'out' },
  { text: '',                                                          type: 'gap' },
  { text: '$ git add .',                                              type: 'cmd' },
  { text: '$ git commit -m "Unang commit ko!"',                      type: 'cmd' },
  { text: '[main (root-commit) a1b2c3d] Unang commit ko!',           type: 'out' },
  { text: ' 1 file changed, 1 insertion(+)',                         type: 'out' },
  { text: '',                                                          type: 'gap' },
  { text: '$ git push origin main',                                   type: 'cmd' },
  { text: "Branch 'main' set up to track 'origin/main'",             type: 'out' },
]

// Typing speeds (ms per char) — vary slightly for realism
const CHAR_DELAYS = [38, 44, 50, 42, 48, 36, 52, 46, 40, 54]
function charDelay(i: number) { return CHAR_DELAYS[i % CHAR_DELAYS.length] }

function TerminalBlock() {
  const reduceMotion = document.documentElement.dataset.reduceMotion === 'true'
  const [shown, setShown]   = useState<TermLine[]>(reduceMotion ? TERMINAL_SCRIPT : [])
  const [typing, setTyping] = useState('')
  const [idle, setIdle]     = useState(reduceMotion)

  useEffect(() => {
    if (reduceMotion) return

    const timers: ReturnType<typeof setTimeout>[] = []
    const push = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))

    let t = 700 // initial pause before first keystroke

    for (const line of TERMINAL_SCRIPT) {
      if (line.type === 'gap') { t += 180; continue }

      if (line.type === 'out') {
        push(t, () => setShown(prev => [...prev, line]))
        t += 110
        continue
      }

      // cmd — type char by char
      for (let ci = 1; ci <= line.text.length; ci++) {
        const partial = line.text.slice(0, ci)
        push(t, () => setTyping(partial))
        t += charDelay(ci)
      }
      const committed = line
      push(t, () => { setShown(prev => [...prev, committed]); setTyping('') })
      t += 420 // pause after "Enter"
    }

    push(t + 300, () => setIdle(true))
    return () => timers.forEach(clearTimeout)
  }, [])

  const monoStyle: React.CSSProperties = {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 13,
    lineHeight: 1.65,
  }
  const cursorStyle: React.CSSProperties = {
    display: 'inline-block', width: 7, height: 14,
    background: 'var(--accent)', borderRadius: 1,
    verticalAlign: 'text-bottom',
    animation: 'heroCursor 1s step-end infinite',
  }

  return (
    <div className="hero-animate hero-d5 hero-terminal">
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 16px',
        background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.85 }} />
          ))}
        </div>
        <span style={{ ...monoStyle, flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
          bash — ~/my-project
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 3, minHeight: 240 }}>
        {shown.map((line, i) =>
          line.type === 'gap'
            ? <div key={i} style={{ height: 8 }} />
            : <div key={i} style={{ ...monoStyle, color: line.type === 'cmd' ? 'var(--code-text-cmd)' : 'var(--code-text-out)' }}>
                {line.text}
              </div>
        )}

        {/* Currently typing */}
        {typing && (
          <div style={{ ...monoStyle, color: 'var(--code-text-cmd)', display: 'flex', alignItems: 'center' }}>
            {typing}<span style={cursorStyle} />
          </div>
        )}

        {/* Idle prompt cursor */}
        {!typing && idle && (
          <div style={{ ...monoStyle, color: 'var(--code-text-cmd)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            $ <span style={cursorStyle} />
          </div>
        )}

        {/* Pre-start cursor (before first char is typed) */}
        {!typing && !idle && shown.length === 0 && (
          <div style={{ ...monoStyle, color: 'var(--code-text-cmd)', display: 'flex', alignItems: 'center', gap: 4 }}>
            $ <span style={{ ...cursorStyle, animation: 'heroCursor 0.8s step-end infinite' }} />
          </div>
        )}
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <div className="hero-layout">
      {/* Left */}
      <div className="hero-left">
        {/* Badge */}
        <div className="hero-animate hero-d1" style={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 12px 5px 6px',
            background: 'var(--active-bg)',
            border: '1px solid var(--active-border)',
            borderRadius: 999,
          }}>
            <span style={{
              background: 'var(--accent-dim)', borderRadius: 999,
              padding: '2px 8px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700,
              color: 'var(--text-on-accent)', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>Open Source</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--accent)' }}>
              Libre at walang bayad
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="hero-animate hero-d2 hero-heading">
          Handa ka na bang<br />
          <span style={{ color: 'var(--accent)' }}>matuto ng Git?</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-animate hero-d3" style={{
          fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7,
          fontFamily: 'Inter, sans-serif', maxWidth: 420, margin: 0,
        }}>
          Step-by-step guide para sa mga Pinoy developers.
          Walang judgement, puro aral lang!
        </p>

        {/* CTAs */}
        <div className="hero-animate hero-d4 hero-ctas">
          <a
            href="/lessons/getting-started"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px',
              background: 'var(--accent-dim)', color: 'var(--text-on-accent)',
              borderRadius: 8, fontWeight: 600, fontSize: 14,
              fontFamily: 'Inter, sans-serif', textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            <Rocket size={15} /> Magsimula Na
          </a>
          <a
            href="#features"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '13px 24px',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              borderRadius: 8, fontWeight: 500, fontSize: 14,
              fontFamily: 'Inter, sans-serif', textDecoration: 'none',
              background: 'transparent',
            }}
          >
            Ano ang Git? →
          </a>
        </div>

        {/* Social proof */}
        <div className="hero-animate hero-d4" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: -4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {([Flag, Code2, GraduationCap] as React.ElementType[]).map((Icon, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--bg-tertiary)', border: '2px solid var(--bg-secondary)',
                marginLeft: i > 0 ? -8 : 0, color: 'var(--text-muted)',
              }}><Icon size={13} /></span>
            ))}
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
            Para sa lahat ng gustong mag-aral
          </span>
        </div>
      </div>

      <TerminalBlock />
    </div>
  )
}

const features: { Icon: React.ElementType; title: string; desc: string }[] = [
  { Icon: Flag,   title: 'Para sa Pinoy',     desc: 'Explained in Taglish para mas madaling intindihin. Walang malalim na jargon, kaya mas praktikal!' },
  { Icon: Zap,    title: 'Beginner-Friendly', desc: 'Wala kang alam? Ok lang! Magsimula tayo sa zero. Walang assumptions, step by step tayo.' },
  { Icon: Wrench, title: 'Hands-on',          desc: 'May mga practice projects at real challenges para ma-apply mo agad ang mga natutunan mo.' },
]

function FeaturesSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef)
  useRevealChildren(cardsRef)

  return (
    <div id="features" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div ref={headingRef} className="reveal">
        <h2 style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>Bakit GitGit Aw?</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 16, fontFamily: 'Inter, sans-serif' }}>Dinisenyo para sa mga Pinoy developers na gustong matuto nang tama.</p>
      </div>
      <div ref={cardsRef} className="features-grid">
        {features.map(f => (
          <div key={f.title} style={{ flex: 1, background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 48, height: 48, background: 'var(--active-bg)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-dim)' }}>
              <f.Icon size={22} />
            </div>
            <h3 style={{ fontWeight: 600, fontSize: 18, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{f.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const steps: { num: string; Icon: React.ElementType; title: string; desc: string; active: boolean }[] = [
  { num: '01', Icon: Monitor,   title: 'Install Git',     desc: 'I-setup ang Git sa iyong computer. Libre at madali!',                      active: true  },
  { num: '02', Icon: GitCommit, title: 'First Commit',    desc: 'Gawin ang iyong unang git commit. Para itong Hello world ng Git!',         active: false },
  { num: '03', Icon: Upload,    title: 'Push to GitHub',  desc: 'I-upload ang code mo sa GitHub para ma-share sa mundo!',                   active: false },
  { num: '04', Icon: Users,     title: 'Collaborate',     desc: 'Makipagtulungan sa ibang developers gamit ang pull requests!',             active: false },
]

function QuickPathSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef)
  useRevealChildren(stepsRef)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div ref={headingRef} className="reveal">
        <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>Saan ka magsisimula?</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 15, fontFamily: 'Inter, sans-serif' }}>Sundan lang ito para maging Git pro ka in no time!</p>
      </div>
      <div ref={stepsRef} className="steps-row">
        {steps.map((step, i) => (
          <React.Fragment key={step.num}>
            <div style={{ flex: 1, background: 'var(--bg-tertiary)', border: `1px solid ${step.active ? 'var(--active-border)' : 'var(--border)'}`, borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11, color: step.active ? 'var(--active-border)' : 'var(--text-muted)', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>STEP {step.num}</div>
                <step.Icon size={14} style={{ color: step.active ? 'var(--active-border)' : 'var(--text-muted)' }} />
              </div>
              <h4 style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{step.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="step-arrow">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
