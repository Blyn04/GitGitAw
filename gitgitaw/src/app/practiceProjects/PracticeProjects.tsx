import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Lock, CheckCircle2, ChevronRight, Star, Zap,
  Globe, Users, Package, Briefcase,
  GitBranch, BookMarked,
  Trophy, Target, Flame,
} from 'lucide-react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'
import { useGameProgress } from '../../hooks/useGameProgress'
import GameHeader from '../../Components/GameHeader'
import friendlyGuidePose from '../../assets/images/GitGitAw_Mascot/Friendly Guide Pose.png'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

// ── Project data for map ────────────────────────────────────────────────────

type MapProject = {
  id: number
  title: string
  desc: string
  icon: React.ElementType
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  xpReward: number
  time: string
  topics?: string[]
}

const MAP_PROJECTS: MapProject[] = [
  // Beginner
  { id: 1, title: 'Ang Aking Unang Repo',      desc: 'Gumawa ng personal repository mula sa simula.',              icon: Globe,      difficulty: 'beginner',     xpReward: 100, time: '15–20 min', topics: ['git init', 'git add', 'git commit', 'git push', 'git remote'] },
  { id: 2, title: 'Commit History Practice',    desc: 'Matuto ng maayos na commit history gamit ang Conventional Commits.', icon: BookMarked, difficulty: 'beginner', xpReward: 100, time: '20–25 min', topics: ['git switch -c', 'git commit', 'git log', 'Conventional Commits'] },
  { id: 3, title: 'Branch at Merge',            desc: 'I-practice ang branching workflow ng team development.',    icon: GitBranch,  difficulty: 'beginner',     xpReward: 100, time: '25–30 min', topics: ['git branch', 'git switch', 'git merge', 'feature branches'] },
  // Intermediate
  { id: 4, title: 'Open Source Contributor',    desc: 'Mag-fork at gumawa ng Pull Request sa isang open-source project.', icon: Users,     difficulty: 'intermediate', xpReward: 150, time: '30–40 min' },
  { id: 5, title: 'Team Workflow Simulation',   desc: 'Simulate ang team Git workflow na may branches at reviews.', icon: Briefcase,  difficulty: 'intermediate', xpReward: 150, time: '35–45 min' },
  { id: 6, title: 'Merge Conflict Resolver',    desc: 'Intentionally mag-create at mag-resolve ng merge conflicts.', icon: Target,    difficulty: 'intermediate', xpReward: 150, time: '30–40 min' },
  // Advanced
  { id: 7, title: 'CI/CD Pipeline Setup',       desc: 'I-set up ang GitHub Actions para sa automated testing.',    icon: Zap,        difficulty: 'advanced',     xpReward: 200, time: '45–60 min' },
  { id: 8, title: 'Git Flow Implementation',    desc: 'I-implement ang full Git Flow strategy sa isang project.',  icon: Package,    difficulty: 'advanced',     xpReward: 200, time: '50–60 min' },
  { id: 9, title: 'Monorepo Architecture',       desc: 'I-set up ang production-ready monorepo na may workspaces.', icon: Trophy,    difficulty: 'advanced',     xpReward: 200, time: '60–75 min' },
]

const DIFF_CONFIG = {
  beginner:     { label: 'Beginner',     color: '#3fb950', bg: '#1a3a1a',  ids: [1, 2, 3] },
  intermediate: { label: 'Intermediate', color: '#58a6ff', bg: '#1a2040',  ids: [4, 5, 6] },
  advanced:     { label: 'Advanced',     color: '#bc8cff', bg: '#2a1a40',  ids: [7, 8, 9] },
}

type NodeState = 'completed' | 'available' | 'locked'

// ── Stars display ───────────────────────────────────────────────────────────

function StarsRow({ stars }: { stars: 0 | 1 | 2 | 3 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1, 2, 3].map(n => (
        <Star
          key={n}
          size={14}
          fill={n <= stars ? '#e3b341' : 'transparent'}
          color={n <= stars ? '#e3b341' : 'var(--border)'}
        />
      ))}
    </div>
  )
}

// ── Map node ────────────────────────────────────────────────────────────────

function MapNode({
  project, state, stars, accentColor, onClick,
}: {
  project: MapProject
  state: NodeState
  stars: 0 | 1 | 2 | 3
  accentColor: string
  onClick: () => void
}) {
  const Icon = project.icon
  const isLocked = state === 'locked'
  const isAvailable = state === 'available'
  const isDone = state === 'completed'

  return (
    <div
      className={`map-node${isAvailable ? ' map-node--available' : ''}${isDone ? ' map-node--done' : ''}`}
      onClick={isLocked ? undefined : onClick}
      style={{
        background: 'var(--bg-secondary)',
        border: `2px solid ${isDone ? accentColor : isAvailable ? accentColor : 'var(--border)'}`,
        borderRadius: 16,
        padding: '20px 24px',
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.45 : 1,
        position: 'relative',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.15s',
        maxWidth: 480,
        width: '100%',
        boxShadow: isDone ? `0 0 16px ${accentColor}30` : isAvailable ? `0 0 20px ${accentColor}25` : 'none',
      }}
    >
      {/* Icon bubble */}
      <div style={{
        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
        background: isDone ? accentColor : isAvailable ? `${accentColor}22` : 'var(--bg-tertiary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isLocked
          ? <Lock size={20} color="var(--text-muted)" />
          : isDone
            ? <CheckCircle2 size={22} color="var(--bg-primary)" fill="var(--bg-primary)" />
            : <Icon size={22} color={accentColor} />
        }
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ ...sans, fontSize: 15, fontWeight: 700, color: isLocked ? 'var(--text-muted)' : 'var(--text-primary)' }}>
            {project.title}
          </span>
          {isDone && <StarsRow stars={stars} />}
          {isAvailable && (
            <ChevronRight size={16} color={accentColor} style={{ flexShrink: 0 }} />
          )}
        </div>
        <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
          {project.desc}
        </p>
        {project.topics && project.topics.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
            {project.topics.map(t => (
              <span key={t} className="map-topic-chip">{t}</span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
          <span style={{ ...mono, fontSize: 11, color: accentColor, display: 'flex', alignItems: 'center', gap: 3 }}>
            <Zap size={10} /> {project.xpReward} XP
          </span>
          <span style={{ ...sans, fontSize: 11, color: 'var(--text-muted)' }}>{project.time}</span>
        </div>
      </div>
    </div>
  )
}

// ── Connector line between nodes ────────────────────────────────────────────

function Connector({ done }: { done: boolean }) {
  return (
    <div style={{
      width: 2,
      height: 32,
      background: done ? 'var(--accent-dim)' : 'var(--border)',
      margin: '0 auto',
      borderRadius: 99,
      transition: 'background 0.3s',
    }} />
  )
}

// ── Cluster header ──────────────────────────────────────────────────────────

function ClusterHeader({
  label, color, bg, unlocked, completedCount, total,
}: {
  label: string; color: string; bg: string
  unlocked: boolean; completedCount: number; total: number
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 20px',
      background: bg,
      border: `1px solid ${color}40`,
      borderRadius: 12,
      maxWidth: 480, width: '100%',
      opacity: unlocked ? 1 : 0.5,
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: color, flexShrink: 0,
      }} />
      <span style={{ ...sans, fontSize: 13, fontWeight: 700, color, flex: 1 }}>
        {label}
      </span>
      <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>
        {completedCount}/{total}
      </span>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function PracticeProjects() {
  const navigate = useNavigate()
  const { showBackToTop, scrollToTop } = useBackToTop()
  const { progress, levelInfo } = useGameProgress()

  function getNodeState(project: MapProject): NodeState {
    if (progress.projects[project.id]?.completed) return 'completed'
    if (project.id === 1) return 'available'
    const prev = MAP_PROJECTS.find(p => p.id === project.id - 1)
    if (!prev) return 'locked'
    // Cross-tier unlock: first of each tier needs previous tier's first project done
    if (project.id === 4 && !progress.projects['3']?.completed) return 'locked'
    if (project.id === 7 && !progress.projects['6']?.completed) return 'locked'
    if (progress.projects[String(project.id - 1)]?.completed) return 'available'
    return 'locked'
  }

  const tiers = (Object.keys(DIFF_CONFIG) as (keyof typeof DIFF_CONFIG)[]).map(key => {
    const cfg = DIFF_CONFIG[key]
    const projects = MAP_PROJECTS.filter(p => p.difficulty === key)
    const completedCount = projects.filter(p => progress.projects[p.id]?.completed).length
    const unlocked = key === 'beginner' || (key === 'intermediate' && !!progress.projects['3']?.completed) || (key === 'advanced' && !!progress.projects['6']?.completed)
    return { key, cfg, projects, completedCount, unlocked }
  })

  return (
    <div className="lesson-page">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: 'var(--accent-dim)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>Practice Projects</span>
      </div>

      {/* Page header */}
      <header className="lesson-header">
        <img src={friendlyGuidePose} alt="GitGitAw Mascot" className="page-mascot" style={{ flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h1 className="lesson-page-title" style={{ ...sans, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Practice Projects
          </h1>
          <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Kumpleto ang mga projects para makakuha ng XP at i-unlock ang mas mahirap na challenges.
          </p>
        </div>
      </header>

      {/* Game header */}
      <GameHeader xp={progress.xp} streak={progress.streak} levelInfo={levelInfo} />

      {/* Streak goal banner */}
      {(() => {
        const today = new Date().toISOString().slice(0, 10)
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
        if (progress.streak === 0) {
          return (
            <div style={{
              ...sans, fontSize: 13, color: 'var(--text-muted)',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '10px 16px', textAlign: 'center',
              maxWidth: 480, width: '100%', alignSelf: 'center',
            }}>
              Start your streak today — complete a project!
            </div>
          )
        } else if (progress.lastActiveDate === today) {
          return (
            <div style={{
              ...sans, fontSize: 13, color: '#e3b341',
              background: '#1a170a', border: '1px solid #e3b34144',
              borderRadius: 8, padding: '10px 16px', textAlign: 'center',
              maxWidth: 480, width: '100%', alignSelf: 'center',
            }}>
              🔥 Streak active — keep it up!
            </div>
          )
        } else if (progress.lastActiveDate === yesterday) {
          return (
            <div style={{
              ...sans, fontSize: 13, color: '#e3b341',
              background: '#1a170a', border: '1px solid #cf222e',
              borderRadius: 8, padding: '10px 16px', textAlign: 'center',
              maxWidth: 480, width: '100%', alignSelf: 'center',
            }}>
              ⚠️ Complete a project today to keep your {progress.streak}-day streak!
            </div>
          )
        }
        return null
      })()}

      {/* Quest map */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, paddingTop: 8 }}>
        {tiers.map((tier, ti) => (
          <React.Fragment key={tier.key}>
            {/* Connector before cluster (except first) */}
            {ti > 0 && <Connector done={tier.unlocked} />}

            {/* Cluster header */}
            <ClusterHeader
              label={tier.cfg.label + ' Zone'}
              color={tier.cfg.color}
              bg={tier.cfg.bg}
              unlocked={tier.unlocked}
              completedCount={tier.completedCount}
              total={tier.projects.length}
            />

            {/* Nodes */}
            {tier.projects.map((project, pi) => {
              const state = getNodeState(project)
              const record = progress.projects[project.id]
              const stars = (record?.stars ?? 0) as 0 | 1 | 2 | 3
              return (
                <React.Fragment key={project.id}>
                  <Connector done={state === 'completed' || (pi === 0 && tier.unlocked)} />
                  <MapNode
                    project={project}
                    state={state}
                    stars={stars}
                    accentColor={tier.cfg.color}
                    onClick={() => navigate(`/lessons/practice/${project.id}`)}
                  />
                </React.Fragment>
              )
            })}
          </React.Fragment>
        ))}

        {/* All done CTA */}
        {MAP_PROJECTS.every(p => progress.projects[p.id]?.completed) && (
          <div style={{
            marginTop: 32, background: 'var(--active-bg)',
            border: '1px solid var(--accent-dim)', borderRadius: 16,
            padding: '28px 32px', textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            maxWidth: 480, width: '100%',
          }}>
            <Trophy size={40} color="var(--accent)" />
            <h3 style={{ ...sans, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Kumpleto ka na!
            </h3>
            <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
              Natapos mo na ang lahat ng practice projects. Subukan ang Challenges!
            </p>
            <a href="/lessons/challenges" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', borderRadius: 8, background: 'var(--accent-dim)',
              color: '#fff', ...sans, fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              <Flame size={16} /> Go to Challenges
            </a>
          </div>
        )}
      </div>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
