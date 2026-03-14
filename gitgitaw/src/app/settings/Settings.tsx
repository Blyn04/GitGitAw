import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { loadSettings, saveSettings, applySettings, DEFAULT_SETTINGS, type AppSettings, type AccentColor, type Theme } from '../../utils/settings'
import Footer from '../../Components/Footer'

const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }
const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }

const ACCENT_META: { id: AccentColor; label: string; dark: string; light: string }[] = [
  { id: 'green',  label: 'Green',  dark: '#3fb950', light: '#1a7f37' },
  { id: 'blue',   label: 'Blue',   dark: '#79c0ff', light: '#0969da' },
  { id: 'purple', label: 'Purple', dark: '#d2a8ff', light: '#8250df' },
  { id: 'orange', label: 'Orange', dark: '#ffa657', light: '#bc4c00' },
]

// ── Small reusable primitives ────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 999, border: 'none',
        background: checked ? 'var(--accent-dim)' : 'var(--border)',
        padding: 2, cursor: 'pointer', position: 'relative',
        flexShrink: 0, transition: 'background 0.2s',
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 2,
        left: checked ? 'calc(100% - 22px)' : 2,
        transition: 'left 0.2s',
      }} />
    </button>
  )
}

function SettingRow({ title, desc, children, divider = true }: {
  title: string; desc: string; children: React.ReactNode; divider?: boolean
}) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '18px 0' }}>
        <div>
          <p style={{ ...sans, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</p>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: '3px 0 0' }}>{desc}</p>
        </div>
        <div style={{ flexShrink: 0 }}>{children}</div>
      </div>
      {divider && <div style={{ height: 1, background: 'var(--border)' }} />}
    </>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{ ...sans, fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>
        {title}
      </h2>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '0 20px' }}>
        {children}
      </div>
    </section>
  )
}

// ── Theme selector ───────────────────────────────────────────────────

function ThemeSelector({ value, onChange }: { value: Theme; onChange: (v: Theme) => void }) {
  const options: { id: Theme; label: string; Icon: React.ElementType }[] = [
    { id: 'dark',  label: 'Dark',  Icon: Moon },
    { id: 'light', label: 'Light', Icon: Sun },
  ]
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {options.map(o => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
            border: value === o.id ? '1px solid var(--active-border)' : '1px solid var(--border)',
            background: value === o.id ? 'var(--active-bg)' : 'transparent',
            color: value === o.id ? 'var(--text-primary)' : 'var(--text-muted)',
            ...sans, fontSize: 13, fontWeight: value === o.id ? 600 : 400,
            transition: 'all 0.15s',
          }}
        >
          <o.Icon size={14} /> {o.label}
        </button>
      ))}
    </div>
  )
}

// ── Accent colour picker ─────────────────────────────────────────────

function AccentPicker({ value, theme, onChange }: { value: AccentColor; theme: Theme; onChange: (v: AccentColor) => void }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {ACCENT_META.map(a => {
        const color = theme === 'dark' ? a.dark : a.light
        const active = value === a.id
        return (
          <button
            key={a.id}
            title={a.label}
            onClick={() => onChange(a.id)}
            style={{
              width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
              background: color, border: 'none', padding: 0,
              outline: active ? `3px solid ${color}` : '3px solid transparent',
              outlineOffset: 3,
              boxShadow: active ? '0 0 0 5px var(--bg-secondary)' : 'none',
              transition: 'outline 0.15s, box-shadow 0.15s',
            }}
            aria-label={a.label}
            aria-pressed={active}
          />
        )
      })}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings)

  function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    const next = { ...settings, [key]: value }
    setSettings(next)
    saveSettings(next)
    applySettings(next)
  }

  function resetAll() {
    const next = { ...DEFAULT_SETTINGS }
    setSettings(next)
    saveSettings(next)
    applySettings(next)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, padding: '48px 56px' }}>

      {/* Header */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h1 style={{ ...sans, fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Settings</h1>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
          I-customize ang iyong experience sa GitGit Aw.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 680 }}>

        {/* Appearance */}
        <SectionCard title="Appearance">
          <SettingRow
            title="Theme"
            desc="Piliin ang dark o light na kulay ng app."
          >
            <ThemeSelector value={settings.theme} onChange={v => update('theme', v)} />
          </SettingRow>
          <SettingRow
            title="Accent Color"
            desc="Kulay ng mga active items, buttons, at highlights."
            divider={false}
          >
            <AccentPicker value={settings.accentColor} theme={settings.theme} onChange={v => update('accentColor', v)} />
          </SettingRow>
        </SectionCard>

        {/* Accessibility */}
        <SectionCard title="Accessibility">
          <SettingRow
            title="Reduce Motion"
            desc="I-disable ang mga animations at slide transitions."
            divider={false}
          >
            <Toggle checked={settings.reduceMotion} onChange={v => update('reduceMotion', v)} />
          </SettingRow>
        </SectionCard>

        {/* About */}
        <SectionCard title="About">
          <SettingRow title="Version" desc="Kasalukuyang bersyon ng app.">
            <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: 6 }}>
              v0.1.0
            </span>
          </SettingRow>
          <SettingRow title="Source Code" desc="Open source sa GitHub — Apache-2.0 license.">
            <a
              href="https://github.com/yurialfrance/GitGitAw"
              target="_blank"
              rel="noreferrer"
              style={{ ...sans, fontSize: 13, color: 'var(--accent-dim)', textDecoration: 'none' }}
            >
              yurialfrance/GitGitAw →
            </a>
          </SettingRow>
          <SettingRow title="Reset Settings" desc="I-balik ang lahat sa default na values." divider={false}>
            <button
              onClick={resetAll}
              style={{
                ...sans, fontSize: 13, cursor: 'pointer',
                padding: '7px 16px', borderRadius: 8,
                border: '1px solid var(--border-warning)',
                background: 'transparent',
                color: 'var(--text-warning)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-warning)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Reset to Defaults
            </button>
          </SettingRow>
        </SectionCard>

        {/* Active settings summary */}
        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ ...mono, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            Saved to device
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              `theme: ${settings.theme}`,
              `accent: ${settings.accentColor}`,
              `reduce-motion: ${settings.reduceMotion}`,
            ].map(tag => (
              <span key={tag} style={{ ...mono, fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
