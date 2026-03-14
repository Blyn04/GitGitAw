import { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  Home, Rocket, BookOpen, GitBranch, Github, Users, Zap,
  Terminal, FileText, Target, Trophy, MessageCircle, BookMarked,
  Settings, Menu, X, Moon, Sun,
} from "lucide-react"
import { loadSettings, saveSettings, applySettings } from "../../utils/settings"

const navItems = [
  { label: 'Home',                 to: '/',                             icon: Home },
  { label: 'Getting Started',      to: '/lessons/getting-started',      icon: Rocket },
  { label: 'The Basics',           to: '/lessons/the-basics',           icon: BookOpen },
  { label: 'Branching & Merging',  to: '/lessons/branching-merging',    icon: GitBranch },
  { label: 'GitHub Essentials',    to: '/lessons/github-essentials',    icon: Github },
  { label: 'Collaboration',        to: '/lessons/collaboration',        icon: Users },
  { label: 'Merge Conflicts',      to: '/lessons/merge-conflicts',      icon: Zap },
  { label: 'Command Cheat Sheet',  to: '/lessons/cheat-sheet',          icon: Terminal },
  { label: 'Conventional Commits', to: '/lessons/conventional-commits', icon: FileText },
  { label: 'Practice Projects',    to: '/lessons/practice',             icon: Target },
  { label: 'Challenges',           to: '/lessons/challenges',           icon: Trophy },
]

const bottomItems = [
  { label: 'Community', to: '/community', icon: MessageCircle },
  { label: 'Glossary',  to: '/glossary',  icon: BookMarked },
  { label: 'Settings',  to: '/settings',  icon: Settings },
]

const mono = { fontFamily: 'JetBrains Mono, monospace' }

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const [isDark, setIsDark] = useState(() => loadSettings().theme === 'dark')

  function toggleTheme() {
    const next = { ...loadSettings(), theme: isDark ? 'light' as const : 'dark' as const }
    saveSettings(next)
    applySettings(next)
    setIsDark(!isDark)
  }

  const close = () => setIsOpen(false)

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────────── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 h-12 border-b"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center p-1 cursor-pointer bg-transparent border-none"
          style={{ color: 'var(--text-primary)' }}
        >
          <Menu size={22} />
        </button>
        <span style={{ ...mono, fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 7 }}>
          <Github size={16} />
          GitGit Aw
        </span>
      </div>

      {/* ── Backdrop ───────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/55 z-40"
          onClick={close}
        />
      )}

      {/* ── Sidebar panel ──────────────────────────────────────── */}
      <aside
        className={[
          'fixed md:sticky top-0 left-0 h-screen w-64',
          'flex flex-col shrink-0 border-r overflow-hidden',
          'z-50 md:z-auto',
          'transition-transform duration-300 ease-in-out md:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      >

        {/* Logo */}
        <div className="flex flex-col gap-1.5 px-4 pt-5 pb-5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Github size={20} style={{ color: 'var(--text-primary)' }} />
              <span style={{ ...mono, fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}>
                GitGit Aw
              </span>
            </div>
            {/* Close button — mobile only */}
            <button
              onClick={close}
              className="md:hidden flex items-center p-1 cursor-pointer bg-transparent border-none"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={18} />
            </button>
          </div>
          <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)', marginLeft: 26 }}>
            Learn Git the Pinoy way!
          </span>
        </div>

        <div className="h-px shrink-0" style={{ background: 'var(--border)' }} />

        {/* Main nav — fills space and scrolls; bottom section stays pinned below */}
        <nav className="sidebar-nav flex-1 min-h-0 overflow-y-auto flex flex-col gap-0.5 px-3 py-3">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={close}
              style={({ isActive }) => ({
                ...mono,
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 6,
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                background: isActive ? 'var(--active-bg)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--active-border)' : '3px solid transparent',
                textDecoration: 'none',
                transition: 'background 0.15s, color 0.15s',
              })}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="h-px shrink-0" style={{ background: 'var(--border)' }} />

        {/* Bottom nav — pinned to bottom of sidebar */}
        <nav className="flex flex-col gap-0.5 px-3 py-3 shrink-0">
          {bottomItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              style={{
                ...mono,
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 6,
                fontSize: 13, color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}

          {/* Dark Mode toggle — same vertical rhythm as nav links */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full py-2.5 px-3 rounded-md cursor-pointer bg-transparent border-none"
            style={{ gap: 8 }}
          >
            <span className="flex items-center gap-2.5" style={{ ...mono, fontSize: 12, color: 'var(--text-muted)' }}>
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>

            {/* Toggle pill */}
            <div
              className="relative shrink-0 rounded-full transition-colors duration-300"
              style={{
                width: 44, height: 24,
                background: isDark ? 'var(--accent-dim)' : 'var(--border)',
                padding: 2,
              }}
            >
              <div
                className="absolute top-0.5 rounded-full bg-white transition-all duration-300"
                style={{
                  width: 20, height: 20,
                  left: isDark ? 'calc(100% - 22px)' : 2,
                }}
              />
            </div>
          </button>
        </nav>
      </aside>
    </>
  )
}
