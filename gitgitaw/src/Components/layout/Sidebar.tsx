import { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  Home, Rocket, BookOpen, GitBranch, Github, Users, Zap,
  Terminal, FileText, Target, Trophy, MessageCircle, BookMarked,
  Settings, Menu, X,
} from "lucide-react"
import restingMascot from "../../assets/images/GitGitAw_Mascot/Resting Icon Pose.png"
import { useCommunityModal } from "../../context/CommunityModalContext"

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
  { label: 'Glossary',  to: '/glossary',  icon: BookMarked },
  { label: 'Settings',  to: '/settings',  icon: Settings },
]

const mono = { fontFamily: 'JetBrains Mono, monospace' }

function CommunityNavButton({ onActivate }: { onActivate: () => void }) {
  const { openCommunity } = useCommunityModal()
  return (
    <button
      type="button"
      className="sidebar-nav-link sidebar-nav-link--bottom"
      onClick={() => {
        openCommunity()
        onActivate()
      }}
    >
      <MessageCircle size={18} />
      Community
    </button>
  )
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────────── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 h-12 border-b"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="sidebar-topbar-btn flex items-center p-1 cursor-pointer bg-transparent border-none"
          style={{ color: 'var(--text-primary)' }}
        >
          <Menu size={22} />
        </button>
        <span style={{ ...mono, fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 7 }}>
          <img src={restingMascot} alt="" width={38} height={38} style={{ objectFit: 'contain', flexShrink: 0 }} />
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
          'fixed md:sticky top-0 left-0 h-screen w-[280px]',
          'flex flex-col shrink-0 border-r overflow-hidden',
          'z-50 md:z-auto',
          'transition-transform duration-300 ease-in-out md:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      >

        {/* Logo — hover matches nav gradient accent */}
        <div className="sidebar-brand-block flex flex-col gap-1.5 px-5 pt-6 pb-6 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={restingMascot}
                alt=""
                width={44}
                height={44}
                className="sidebar-brand-mascot"
                style={{ objectFit: 'contain', flexShrink: 0 }}
              />
              <span
                className="sidebar-brand-title"
                style={{ ...mono, fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}
              >
                GitGit Aw
              </span>
            </div>
            {/* Close button — mobile only */}
            <button
              type="button"
              onClick={close}
              className="sidebar-close-btn md:hidden flex items-center p-1 cursor-pointer bg-transparent border-none"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={18} />
            </button>
          </div>
          <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)', marginLeft: 46 }}>
            Learn Git the Pinoy way!
          </span>
        </div>

        <div className="h-px shrink-0" style={{ background: 'var(--border)' }} />

        {/* Main nav — fills space and scrolls; bottom section stays pinned below */}
        <nav className="sidebar-nav flex-1 min-h-0 overflow-y-auto flex flex-col gap-1.5 px-4 py-4">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={close}
              // style={({ isActive }) => ({
              //   ...mono,
              //   display: 'flex', alignItems: 'center', gap: 12,
              //   padding: '10px 16px', borderRadius: 6,
              //   fontSize: 14,
              //   fontWeight: isActive ? 600 : 400,
              //   color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              //   background: isActive ? 'var(--accent-dim)' : 'transparent',
              //   borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
              //   textDecoration: 'none',
              //   transition: 'background 0.15s, color 0.15s',
              // })}
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? 'sidebar-nav-link--active' : ''}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="h-px shrink-0" style={{ background: 'var(--border)' }} />

        {/* Bottom nav — pinned to bottom of sidebar; extra horizontal padding so dark mode isn't cramped */}
        <nav className="flex flex-col gap-1.5 px-5 py-4 pb-5 shrink-0">
          <CommunityNavButton onActivate={close} />
          {bottomItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) =>
                `sidebar-nav-link sidebar-nav-link--bottom ${isActive ? 'sidebar-nav-link--active' : ''}`.trim()
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
