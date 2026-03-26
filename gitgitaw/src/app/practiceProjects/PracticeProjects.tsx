import React, { useState } from 'react'
import friendlyGuidePose from '../../assets/images/GitGitAw_Mascot/Friendly Guide Pose.png'
import {
  ListChecks, TrendingUp, Trophy,
  Clock, Play, ChevronDown, ChevronUp,
  CheckCircle2, CheckSquare, Square,
  Globe, Users, Package, Briefcase,
  BookOpen, GitBranch, BookMarked,
  Target, PartyPopper,
} from 'lucide-react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

// ── Skill chip ─────────────────────────────────────────────────────────────

function SkillChip({ label, color = '#7ee787' }: { label: string; color?: string }) {
  return (
    <span style={{
      ...mono, fontSize: 12, color,
      background: 'var(--bg-tertiary)', border: '1px solid var(--border)',
      borderRadius: 4, padding: '4px 10px', whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}

// ── Level badge ────────────────────────────────────────────────────────────

function LevelBadge({ level, color, bg }: { level: string; color: string; bg: string }) {
  return (
    <span style={{
      ...sans, fontSize: 11, fontWeight: 700, color,
      background: bg, borderRadius: 12, padding: '4px 10px', whiteSpace: 'nowrap',
    }}>
      {level}
    </span>
  )
}

// ── Code snippet inside steps ──────────────────────────────────────────────

function StepCode({ code }: { code: string }) {
  return (
    <div style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', borderRadius: 6, padding: '12px 14px' }}>
      <pre style={{ ...mono, fontSize: 12, color: '#7ee787', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
    </div>
  )
}

// ── Beginner project card (expanded, with collapsible steps) ───────────────

type Step = { label: string; code: string }
type BeginnerProjectProps = {
  projectId: number
  number: number
  icon: React.ReactNode
  title: string
  desc: string
  time: string
  skills: { label: string; color?: string }[]
  whatYouBuild: string
  steps: Step[]
  checklist: string[]
  successMsg: string
  defaultOpen?: boolean
}

function BeginnerProject({
  projectId, number, icon, title, desc, time, skills,
  whatYouBuild, steps, checklist, successMsg, defaultOpen = false,
}: BeginnerProjectProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      background: 'var(--bg-secondary)', borderRadius: 12,
      padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
      border: '1px solid var(--accent)',
    }}>
      {/* Header row */}
      <div className="practice-proj-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LevelBadge level="🟢 Beginner" color="#3fb950" bg="#1a3a1a" />
          <span style={{ ...sans, fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-tertiary)', borderRadius: 12, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={11} /> {time}
          </span>
        </div>
        <a
          href={`/lessons/practice/${projectId}`}
          style={{ ...sans, fontSize: 12, fontWeight: 600, color: '#ffffff', background: 'var(--accent-dim)', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
        >
          <Play size={11} fill="#ffffff" /> Start Project
        </a>
      </div>

      {/* Title + desc */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3 style={{ ...sans, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon} Project {number}: {title}
        </h3>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>

      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* Skills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Skills Practiced:</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map(s => <SkillChip key={s.label} label={s.label} color={s.color} />)}
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* What you build */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>What You Will Build:</span>
        <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{whatYouBuild}</p>
      </div>

      {/* Collapsible steps */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8,
          padding: '10px 14px', cursor: 'pointer', width: '100%', textAlign: 'left',
          color: 'var(--text-primary)', ...sans, fontSize: 13, fontWeight: 600,
        }}
      >
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        Step-by-step Instructions
        <span style={{ ...sans, fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>(collapsible)</span>
      </button>

      {open && (
        <div style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <span style={{ ...sans, fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{step.label}</span>
              <StepCode code={step.code} />
            </React.Fragment>
          ))}
        </div>
      )}

      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Completion Checklist:</span>
        {checklist.map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckSquare size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Success banner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1a3a1a', border: '1px solid var(--accent)', borderRadius: 8, padding: '12px 16px' }}>
        <PartyPopper size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <span style={{ ...sans, fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>{successMsg}</span>
      </div>
    </div>
  )
}

// ── Compact project card (intermediate / advanced) ─────────────────────────

function ProjectCard({
  projectId, badge, badgeColor, badgeBg,
  title, desc, tags, borderColor, btnColor,
}: {
  projectId: number
  badge: string; badgeColor: string; badgeBg: string
  title: string; desc: string; tags: string
  borderColor: string; btnColor: string
}) {
  return (
    <div style={{
      flex: 1, background: 'var(--bg-secondary)', borderRadius: 12,
      padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
      border: `1px solid ${borderColor}`,
    }}>
      <LevelBadge level={badge} color={badgeColor} bg={badgeBg} />
      <h3 style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
      <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{desc}</p>
      <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)' }}>{tags}</span>
      <a
        href={`/lessons/practice/${projectId}`}
        style={{
          alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6,
          ...sans, fontSize: 12, fontWeight: 600, color: '#ffffff',
          background: btnColor, borderRadius: 6,
          padding: '6px 12px', marginTop: 4, textDecoration: 'none',
        }}
      >
        <Play size={11} fill="#ffffff" /> Start Project
      </a>
    </div>
  )
}

// ── Bonus card ─────────────────────────────────────────────────────────────

function BonusCard({ Icon, title, desc }: { Icon: React.ElementType; title: string; desc: string }) {
  return (
    <div style={{
      flex: 1, background: 'var(--bg-secondary)', borderRadius: 10,
      padding: 20, display: 'flex', flexDirection: 'column', gap: 10,
      border: '1px solid var(--text-warning)',
    }}>
      <Icon size={22} style={{ color: 'var(--text-warning)' }} strokeWidth={1.75} />
      <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>
      <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{desc}</p>
    </div>
  )
}

// ── Tracker checkbox row ───────────────────────────────────────────────────

function TrackerItem({
  label, checked, onChange, accentColor,
}: {
  label: string; checked: boolean; onChange: () => void; accentColor: string
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        textAlign: 'left',
      }}
    >
      {checked
        ? <CheckCircle2 size={16} style={{ color: accentColor, flexShrink: 0 }} />
        : <Square size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} strokeWidth={1.5} />
      }
      <span style={{ ...sans, fontSize: 13, color: checked ? 'var(--text-primary)' : 'var(--text-muted)', textDecoration: checked ? 'line-through' : 'none' }}>
        {label}
      </span>
    </button>
  )
}

// ── Resource card ──────────────────────────────────────────────────────────

function ResourceCard({
  Icon, level, color, borderColor, links,
}: {
  Icon: React.ElementType; level: string; color: string; borderColor: string
  links: { label: string; isExternal?: boolean }[]
}) {
  return (
    <div style={{
      flex: 1, background: 'var(--bg-secondary)', borderRadius: 10,
      padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
      border: `1px solid ${borderColor}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={16} style={{ color }} />
        <span style={{ ...sans, fontSize: 14, fontWeight: 700, color }}>{level}</span>
      </div>
      <div style={{ height: 1, background: 'var(--border)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map(link => (
          <span key={link.label} style={{ ...sans, fontSize: 13, color: link.isExternal ? 'var(--text-link)' : 'var(--text-muted)' }}>
            → {link.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

const ALL_PROJECTS = [
  { label: 'Project 1: Ang Aking Unang Repo', color: '#3fb950' },
  { label: 'Project 2: Commit History Practice', color: '#3fb950' },
  { label: 'Project 3: Branch at Merge', color: '#3fb950' },
  { label: 'Project 4: Fake Collaboration Simulation', color: '#58a6ff' },
  { label: 'Project 5: Intentional Conflict Resolution', color: '#58a6ff' },
  { label: 'Project 6: Versioning with Tags', color: '#58a6ff' },
  { label: 'Project 7: Open Source Simulation', color: '#bc8cff' },
  { label: 'Project 8: Git Flow Workflow', color: '#bc8cff' },
  { label: 'Project 9: GitHub Actions CI/CD', color: '#bc8cff' },
]

export default function PracticeProjects() {
  const { showBackToTop, scrollToTop } = useBackToTop()
  const [completed, setCompleted] = useState<boolean[]>(ALL_PROJECTS.map(() => false))

  function toggleProject(i: number) {
    setCompleted(prev => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  const doneCount = completed.filter(Boolean).length
  const progressPct = Math.round((doneCount / ALL_PROJECTS.length) * 100)

  return (
    <div className="lesson-page">

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: 'var(--text-link)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>Practice Projects</span>
      </div>

      {/* Page Header */}
      <header className="lesson-header">
        <img src={friendlyGuidePose} alt="GitGitAw Mascot" className="page-mascot" style={{ flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 className="lesson-page-title" style={{ ...sans, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Practice Projects
          </h1>
          <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            Matuto ng Git sa pamamagitan ng actual practice.<br />
            Subukan ang mga guided projects na ito para masanay sa real Git workflows.
          </p>
        </div>
      </header>

      {/* ── S1 — Bakit Kailangan ng Practice ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 className="practice-section-h2" style={{ ...sans, color: 'var(--text-primary)' }}>
          Bakit Kailangan ng Practice?
        </h2>

        {/* Story card */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: 'var(--text-link)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <BookOpen size={14} /> Bakit Kailangan ng Practice?
          </span>
          <p style={{ ...sans, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
            Maraming developers ang nagbabasa ng Git tutorials, pero nahihirapan pa rin kapag ginagamit na ito sa actual projects.
            Kadalasan, kulang lang sa practice.
          </p>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <p style={{ ...sans, fontSize: 14, fontStyle: 'italic', color: 'var(--text-warning)', lineHeight: 1.5, margin: 0 }}>
            💡 "Parang pagbibisikleta ang Git — mas madaling matutunan kapag ginagawa mo na talaga."
          </p>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Sa page na ito, maaari kang mag-practice gamit ang guided projects na may step-by-step instructions.
          </p>
        </div>

        {/* 3 mini cards */}
        <div className="lesson-cards-row">
          {([
            { Icon: ListChecks, title: 'Structured Projects',      desc: 'Bawat project ay may malinaw na goal at step-by-step instructions.' },
            { Icon: TrendingUp, title: 'Progressive Difficulty',   desc: 'Nagsisimula sa basic concepts hanggang sa mas advanced workflows.' },
            { Icon: Trophy,     title: 'Real Development Skills',  desc: 'Ang mga skills na matututunan dito ay ginagamit din sa real development workflows.' },
          ] as const).map(c => (
            <div key={c.title} style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <c.Icon size={20} style={{ color: 'var(--accent-dim)' }} strokeWidth={1.75} />
              <span style={{ ...sans, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</span>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── S2 — Difficulty Levels ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 className="practice-section-h2" style={{ ...sans, color: 'var(--text-primary)' }}>Difficulty Levels</h2>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
          Piliin ang level na angkop sa iyong experience.
        </p>

        <div className="lesson-cards-row">
          {([
            { label: '🟢 Beginner',     color: '#3fb950', border: '#3fb950', desc: 'Para sa mga bagong gumagamit ng Git.\nMay step-by-step instructions at walang assumed knowledge.',      time: '15–30 minutes per project' },
            { label: '🔵 Intermediate', color: '#58a6ff', border: '#58a6ff', desc: 'Para sa may basic Git knowledge na.\nMay mas complex workflows at collaboration scenarios.',           time: '30–60 minutes per project' },
            { label: '🟣 Advanced',     color: '#bc8cff', border: '#bc8cff', desc: 'Para sa komportable na sa Git basics.\nMay real-world workflows at advanced scenarios.',                time: '1–2 hours per project' },
          ]).map(lv => (
            <div key={lv.label} style={{ flex: 1, background: 'var(--bg-secondary)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14, border: `1px solid ${lv.border}` }}>
              <span style={{ ...sans, fontSize: 17, fontWeight: 700, color: lv.color }}>{lv.label}</span>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>{lv.desc}</p>
              <div style={{ height: 1, background: 'var(--border)' }} />
              <span style={{ ...sans, fontSize: 12, fontWeight: 600, color: lv.color, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={12} /> {lv.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── S3 — Beginner Projects ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 className="practice-section-h2" style={{ ...sans, color: '#3fb950' }}>
            <Target size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
            Beginner Projects
          </h2>
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Magsimula tayo sa mga basic Git workflows.</p>
        </div>

        <BeginnerProject
          projectId={1}
          number={1}
          icon="📁"
          title="Ang Aking Unang Repo"
          desc="Gumawa ng personal repository mula sa simula. Ito ang basic Git workflow na karaniwang ginagamit sa personal projects."
          time="15–20 min"
          skills={[
            { label: 'git init' }, { label: 'git add' }, { label: 'git commit' }, { label: 'git push' },
          ]}
          whatYouBuild="Isang personal README repository na naka-setup sa local machine at sa GitHub."
          steps={[
            { label: 'Step 1: Gumawa ng bagong folder', code: 'mkdir my-first-repo\ncd my-first-repo' },
            { label: 'Step 2: I-initialize ang Git', code: 'git init' },
            { label: 'Step 3: Gumawa ng README.md', code: 'touch README.md\n# Lagyan ng: Pangalan, Skills, Developer goals' },
            { label: 'Step 4: Unang commit', code: 'git add README.md\ngit commit -m "feat: add personal README"' },
            { label: 'Step 5: I-connect sa GitHub', code: 'git remote add origin https://github.com/username/my-first-repo.git\ngit branch -M main\ngit push -u origin main' },
          ]}
          checklist={[
            'Folder created at naka-init ang Git',
            'May README.md na may content',
            'Naka-commit ang changes',
            'Naka-push sa GitHub',
            'Nakikita ang repo sa GitHub profile',
          ]}
          successMsg="Mayroon ka nang GitHub repository!"
          defaultOpen={true}
        />

        <BeginnerProject
          projectId={2}
          number={2}
          icon="✏️"
          title="Commit History Practice"
          desc="Matuto kung paano gumawa ng maayos na commit history gamit ang Conventional Commits format."
          time="20–25 min"
          skills={[
            { label: 'git commit' }, { label: 'git log' }, { label: 'git diff' },
            { label: 'conventional commits', color: '#e3b341' },
          ]}
          whatYouBuild="Isang simpleng to-do list app (HTML/CSS) na may malinaw na commit history."
          steps={[
            { label: 'Clone starter template', code: 'git clone https://github.com/gitgitaw/todo-starter.git\ncd todo-starter' },
            { label: 'Gumawa ng branch', code: 'git switch -c feature/todo-app' },
            { label: 'Commit step by step', code: 'git add index.html\ngit commit -m "feat: add basic HTML structure"\ngit add styles.css\ngit commit -m "style: add base styling"\ngit add script.js\ngit commit -m "feat: add task functionality"' },
            { label: 'Review ang history', code: 'git log --oneline\ngit log --oneline --graph' },
          ]}
          checklist={[
            'May 5 o higit pang commits',
            'Lahat ng commit messages ay Conventional Commits format',
            'Malinaw ang history sa git log',
            'Naka-push sa GitHub',
          ]}
          successMsg="Malinaw na commit history — professional na ang dating ng iyong repo!"
        />

        <BeginnerProject
          projectId={3}
          number={3}
          icon="🌿"
          title="Branch at Merge"
          desc="I-practice ang branching workflow na karaniwang ginagamit sa team development."
          time="25–30 min"
          skills={[
            { label: 'git branch' }, { label: 'git switch' }, { label: 'git merge' }, { label: 'git push' },
          ]}
          whatYouBuild="Isang simpleng portfolio page na may malinaw na branching history."
          steps={[
            { label: 'Gumawa ng branch para sa bawat feature', code: 'git switch -c feature/header\n# ... gumawa ng changes ...\ngit add .\ngit commit -m "feat: add portfolio header"' },
            { label: 'Mag-merge pabalik sa main', code: 'git switch main\ngit merge feature/header' },
            { label: 'Ulitin para sa ibang sections', code: 'git switch -c feature/about\ngit switch -c feature/projects' },
          ]}
          checklist={[
            'Gumawa ng hindi bababa sa 3 feature branches',
            'Na-merge ang lahat ng branches sa main',
            'Malinaw ang branching history sa git log --graph',
            'Naka-push ang final project sa GitHub',
          ]}
          successMsg="Mayroon kang portfolio page na may malinaw na branching history!"
        />
      </section>

      {/* ── S4 — Intermediate Projects ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 className="practice-section-h2" style={{ ...sans, color: '#58a6ff' }}>
            <GitBranch size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
            Intermediate Projects
          </h2>
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Subukan ang mas realistic Git scenarios.</p>
        </div>

        <div className="lesson-cards-row">
          <ProjectCard
            projectId={4}
            badge="🔵 Intermediate" badgeColor="#58a6ff" badgeBg="#1a2040"
            title="Project 4: Fake Collaboration Simulation"
            desc="I-simulate ang team collaboration gamit ang Pull Requests at code review workflow."
            tags="Pull Requests · Collaboration workflows"
            borderColor="#58a6ff" btnColor="#1158a8"
          />
          <ProjectCard
            projectId={5}
            badge="🔵 Intermediate" badgeColor="#58a6ff" badgeBg="#1a2040"
            title="Project 5: Intentional Conflict Resolution"
            desc="Gumawa ng intentional merge conflicts at matutunan kung paano ito ayusin nang tama."
            tags="Merge conflicts · Resolution strategies"
            borderColor="#58a6ff" btnColor="#1158a8"
          />
          <ProjectCard
            projectId={6}
            badge="🔵 Intermediate" badgeColor="#58a6ff" badgeBg="#1a2040"
            title="Project 6: Versioning with Tags"
            desc="Matuto kung paano gumamit ng Git tags para mag-manage ng semantic versioning."
            tags="Git tags · Semantic versioning"
            borderColor="#58a6ff" btnColor="#1158a8"
          />
        </div>
      </section>

      {/* ── S5 — Advanced Projects ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 className="practice-section-h2" style={{ ...sans, color: '#bc8cff' }}>
            <Trophy size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
            Advanced Projects
          </h2>
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Para sa gustong subukan ang mas advanced Git workflows.</p>
        </div>

        <div className="lesson-cards-row">
          <ProjectCard
            projectId={7}
            badge="🟣 Advanced" badgeColor="#bc8cff" badgeBg="#2a1a40"
            title="Project 7: Open Source Contribution Simulation"
            desc="I-simulate ang buong open source contribution workflow gamit ang fork, upstream, at Pull Request."
            tags="Fork · Upstream workflow · Pull Requests"
            borderColor="#bc8cff" btnColor="#4a1d8a"
          />
          <ProjectCard
            projectId={8}
            badge="🟣 Advanced" badgeColor="#bc8cff" badgeBg="#2a1a40"
            title="Project 8: Git Flow Workflow"
            desc="Gamitin ang Git Flow branching strategy sa isang full project lifecycle."
            tags="Git Flow · Release branches · Hotfixes"
            borderColor="#bc8cff" btnColor="#4a1d8a"
          />
          <ProjectCard
            projectId={9}
            badge="🟣 Advanced" badgeColor="#bc8cff" badgeBg="#2a1a40"
            title="Project 9: GitHub Actions CI/CD"
            desc="Gumawa ng basic CI/CD pipeline gamit ang GitHub Actions para sa automated testing."
            tags="CI/CD · GitHub Actions · Automation"
            borderColor="#bc8cff" btnColor="#4a1d8a"
          />
        </div>
      </section>

      {/* ── S6 — Bonus Challenges ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <h2 className="practice-section-h2" style={{ ...sans, color: 'var(--text-warning)' }}>
            🌟 Bonus Challenges
          </h2>
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Optional challenges para sa gustong mag-explore pa.</p>
        </div>

        <div className="lesson-cards-row">
          <BonusCard Icon={Briefcase} title="I-Git ang Existing Project"    desc="Kunin ang isang lumang project mo at i-initialize ang Git para sa proper version control." />
          <BonusCard Icon={Globe}     title="Mag-contribute sa Real Open Source" desc="Hanapin ang isang beginner-friendly open source repo at gumawa ng real contribution." />
        </div>
        <div className="lesson-cards-row">
          <BonusCard Icon={Users}   title="Team Project with Classmates" desc="Makipagtulungan sa 2–3 classmates sa isang shared repo at practice ang real team workflows." />
          <BonusCard Icon={Package} title="Publish Library sa npm o PyPI"  desc="Gumawa ng simpleng library at i-publish ito sa npm o PyPI gamit ang proper Git tagging." />
        </div>
      </section>

      {/* ── S7 — I-share ang Iyong Projects ── */}
      <div className="practice-card-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Trophy size={28} style={{ color: 'var(--text-warning)' }} strokeWidth={1.5} />
          <h2 className="practice-section-h2" style={{ ...sans, color: 'var(--text-primary)' }}>I-share ang Iyong Projects</h2>
        </div>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          Kapag natapos mo ang isang project, maaari mo itong i-share sa GitGit Aw community para makakuha ng
          feedback mula sa ibang developers.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Submission Steps:</span>
          {[
            'I-push ang project sa GitHub',
            'Pumunta sa GitGit Aw Discord',
            'I-post ang repo link sa #show-your-work channel',
            'Magbigay din ng feedback sa ibang projects',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ ...sans, fontSize: 11, fontWeight: 700, color: '#ffffff' }}>{i + 1}</span>
              </div>
              <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── S8 — Learning Path Tracker ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 className="practice-section-h2" style={{ ...sans, color: 'var(--text-primary)' }}>
          Learning Path Tracker
        </h2>

        {/* Progress bar */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Overall Progress</span>
            <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>{doneCount} / {ALL_PROJECTS.length} completed</span>
          </div>
          <div style={{ background: 'var(--bg-tertiary)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
            <div style={{ height: 8, borderRadius: 4, background: 'var(--accent)', width: `${progressPct}%`, transition: 'width 0.3s ease' }} />
          </div>
          <span style={{ ...sans, fontSize: 12, color: 'var(--text-muted)' }}>
            {progressPct === 0 ? '0% — Simulan na ang unang project' : `${progressPct}% — ${doneCount === ALL_PROJECTS.length ? 'Kumpleto na! 🎉' : 'Magaling, ituloy mo!'}`}
          </span>
        </div>

        {/* Track columns */}
        <div className="lesson-cards-row">
          {/* Beginner track */}
          <div style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--accent)', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>🟢 Beginner</span>
            {[0, 1, 2].map(i => (
              <TrackerItem key={i} label={ALL_PROJECTS[i].label} checked={completed[i]} onChange={() => toggleProject(i)} accentColor="#3fb950" />
            ))}
          </div>
          {/* Intermediate track */}
          <div style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid #58a6ff', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: '#58a6ff' }}>🔵 Intermediate</span>
            {[3, 4, 5].map(i => (
              <TrackerItem key={i} label={ALL_PROJECTS[i].label} checked={completed[i]} onChange={() => toggleProject(i)} accentColor="#58a6ff" />
            ))}
          </div>
          {/* Advanced track */}
          <div style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid #bc8cff', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: '#bc8cff' }}>🟣 Advanced</span>
            {[6, 7, 8].map(i => (
              <TrackerItem key={i} label={ALL_PROJECTS[i].label} checked={completed[i]} onChange={() => toggleProject(i)} accentColor="#bc8cff" />
            ))}
          </div>
        </div>
      </section>

      {/* ── S9 — Recommended Resources ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 className="practice-section-h2" style={{ ...sans, color: 'var(--text-primary)' }}>Recommended Resources</h2>

        <div className="lesson-cards-row">
          <ResourceCard
            Icon={BookOpen} level="🟢 Beginner" color="#3fb950" borderColor="#3fb950"
            links={[
              { label: 'Git Basics pages' },
              { label: 'learngitbranching.js.org', isExternal: true },
              { label: 'GitHub Hello World', isExternal: true },
              { label: 'Git crash course videos' },
            ]}
          />
          <ResourceCard
            Icon={GitBranch} level="🔵 Intermediate" color="#58a6ff" borderColor="#58a6ff"
            links={[
              { label: 'Branching & Merging guide' },
              { label: 'Collaboration workflows' },
              { label: 'Atlassian Git tutorials', isExternal: true },
              { label: 'The Odin Project Git lessons', isExternal: true },
            ]}
          />
          <ResourceCard
            Icon={BookMarked} level="🟣 Advanced" color="#bc8cff" borderColor="#bc8cff"
            links={[
              { label: 'Pro Git Book', isExternal: true },
              { label: 'GitHub Actions documentation' },
              { label: 'Conventional Commits spec', isExternal: true },
              { label: 'Git Flow cheatsheet' },
            ]}
          />
        </div>
      </section>

      {/* ── S10 — Next Steps CTA ── */}
      <div className="practice-card-lg" style={{ background: '#1a3a1a', border: '1px solid var(--accent)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ ...sans, fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Handa ka nang mag-practice ng Git workflows.
        </h3>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          Pagkatapos ng practice projects, subukan ang Challenges para sa mas complex scenarios.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/lessons/challenges"
            style={{ ...sans, fontSize: 14, fontWeight: 600, color: '#ffffff', background: 'var(--accent-dim)', borderRadius: 8, padding: '10px 20px', textDecoration: 'none' }}>
            Challenges →
          </a>
          <a href="/lessons/conventional-commits"
            style={{ ...sans, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 20px', textDecoration: 'none' }}>
            ← Conventional Commits
          </a>
        </div>
      </div>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
