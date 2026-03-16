import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, CheckCheck, SkipForward, RotateCcw, Send,
  CheckCircle2, Clock, Trophy, Lightbulb, ChevronRight,
  Target, Loader, Zap,
} from 'lucide-react'
import Footer from '../../Components/Footer'
import { getProject } from './projectData'
import type { ProjectStep } from './projectData'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

// ── OS / theme types ────────────────────────────────────────────────────────

type OS = 'windows' | 'mac' | 'linux'

interface TerminalTheme {
  bg:          string
  promptUser:  string
  promptPath:  string
  promptSym:   string
  text:        string
  output:      string
  fontFamily:  string
}

const THEMES: Record<OS, TerminalTheme> = {
  windows: {
    bg:         '#0c0c0c',
    promptUser: '#ccb700',   // PS yellow
    promptPath: '#2672ec',   // blue path
    promptSym:  '#cccccc',
    text:       '#cccccc',
    output:     '#aaaaaa',
    fontFamily: 'Cascadia Code, Consolas, JetBrains Mono, monospace',
  },
  mac: {
    bg:         '#1e1e1e',
    promptUser: '#3fb950',   // green user@host
    promptPath: '#8b949e',   // muted dir
    promptSym:  '#3fb950',   // green %
    text:       '#e6edf3',
    output:     '#8b949e',
    fontFamily: 'Menlo, Monaco, JetBrains Mono, monospace',
  },
  linux: {
    bg:         '#300a24',   // Ubuntu terminal purple
    promptUser: '#4ec94e',   // bright green user@host
    promptPath: '#729fcf',   // blue path
    promptSym:  '#ffffff',
    text:       '#ffffff',
    output:     '#d3d3d3',
    fontFamily: 'Ubuntu Mono, JetBrains Mono, monospace',
  },
}

// ── Entry types ─────────────────────────────────────────────────────────────

type EntryKind = 'command' | 'output' | 'error' | 'success' | 'info' | 'hint'

interface HistoryEntry {
  kind: EntryKind
  text: string
}

function entryColor(kind: EntryKind, os: OS): string {
  const t = THEMES[os]
  return {
    command: t.text,
    output:  t.output,
    error:   '#f85149',
    success: '#3fb950',
    info:    os === 'windows' ? '#569cd6' : '#58a6ff',
    hint:    '#e3b341',
  }[kind]
}

// ── Prompt helpers ───────────────────────────────────────────────────────────

function getWinPath(dir: string) {
  return dir === '~'
    ? 'C:\\Users\\gitgitaw'
    : 'C:\\Users\\gitgitaw' + dir.slice(1).replace(/\//g, '\\')
}

// ── Prompt display (multi-coloured, per OS) ─────────────────────────────────

function PromptDisplay({ dir, os, size = 13 }: { dir: string; os: OS; size?: number }) {
  const t = THEMES[os]
  const ff = { fontFamily: t.fontFamily, fontSize: size }

  if (os === 'windows') {
    return (
      <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
        <span style={{ ...ff, color: t.promptUser }}>PS </span>
        <span style={{ ...ff, color: t.promptPath }}>{getWinPath(dir)}</span>
        <span style={{ ...ff, color: t.promptSym }}>{'> '}</span>
      </span>
    )
  }
  if (os === 'linux') {
    return (
      <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
        <span style={{ ...ff, color: t.promptUser }}>gitgitaw@ubuntu</span>
        <span style={{ ...ff, color: t.promptSym }}>:</span>
        <span style={{ ...ff, color: t.promptPath }}>{dir}</span>
        <span style={{ ...ff, color: t.promptSym }}>{'$ '}</span>
      </span>
    )
  }
  // macOS
  const shortDir = dir === '~' ? '~' : (dir.split('/').pop() || dir)
  return (
    <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
      <span style={{ ...ff, color: t.promptUser }}>gitgitaw@MacBook-Pro </span>
      <span style={{ ...ff, color: t.promptPath }}>{shortDir} </span>
      <span style={{ ...ff, color: t.promptSym }}>{'% '}</span>
    </span>
  )
}

// ── OS-specific terminal title bars ─────────────────────────────────────────

function TitleBarMac({ title }: { title: string }) {
  return (
    <div style={{
      background: 'linear-gradient(to bottom, #3d3d3d, #2f2f2f)',
      padding: '10px 16px',
      display: 'flex', alignItems: 'center',
      position: 'relative', flexShrink: 0,
      borderBottom: '1px solid #1a1a1a',
      minHeight: 36,
    }}>
      <div style={{ display: 'flex', gap: 7, zIndex: 1 }}>
        {[
          { bg: '#ff5f57', border: '#e0443e' },
          { bg: '#febc2e', border: '#d4a017' },
          { bg: '#28c840', border: '#1aab29' },
        ].map(({ bg, border }) => (
          <div key={bg} style={{
            width: 12, height: 12, borderRadius: '50%',
            background: bg, border: `0.5px solid ${border}`,
            flexShrink: 0,
          }} />
        ))}
      </div>
      <span style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
        fontSize: 12, color: '#9d9d9d', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        {title} — zsh
      </span>
    </div>
  )
}

function TitleBarWindows({ title }: { title: string }) {
  return (
    <div style={{
      background: '#1f1f1f',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 34, flexShrink: 0, borderBottom: '1px solid #2d2d2d',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12 }}>
        <div style={{
          width: 16, height: 16, background: '#2672ec', borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontSize: 8, color: '#fff', fontFamily: 'Consolas, monospace', fontWeight: 700, lineHeight: 1 }}>PS</span>
        </div>
        <span style={{ fontSize: 12, color: '#cccccc', fontFamily: 'Segoe UI, Inter, sans-serif' }}>
          {title} — Windows PowerShell
        </span>
      </div>
      <div style={{ display: 'flex', height: '100%' }}>
        {['─', '□', '✕'].map((label, i) => (
          <div key={i} style={{
            width: 46, height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#cccccc', fontSize: i === 2 ? 10 : 12,
            fontFamily: 'Segoe UI, sans-serif', cursor: 'default',
            transition: 'background 0.1s',
          }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

function TitleBarLinux({ title }: { title: string }) {
  return (
    <div style={{
      background: '#2d2d2d',
      padding: '0 16px',
      height: 34, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid #1a1a1a',
    }}>
      <div style={{ width: 14 }} />
      <span style={{
        fontFamily: 'Ubuntu, Inter, sans-serif',
        fontSize: 12, color: '#d0d0d0',
      }}>
        {title}
      </span>
      <div style={{
        width: 14, height: 14, borderRadius: '50%',
        background: '#f24d4d', border: '0.5px solid #c03030',
      }} />
    </div>
  )
}

function TerminalTitleBar({ os, title }: { os: OS; title: string }) {
  if (os === 'mac')     return <TitleBarMac     title={title} />
  if (os === 'windows') return <TitleBarWindows title={title} />
  return <TitleBarLinux title={title} />
}

// ── Single terminal output line ──────────────────────────────────────────────

function TerminalEntry({ entry, dir, os }: { entry: HistoryEntry; dir: string; os: OS }) {
  const t = THEMES[os]
  const ff = { fontFamily: t.fontFamily, fontSize: 13 }

  if (entry.kind === 'command') {
    return (
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', animation: 'termEntry 0.15s ease' }}>
        <PromptDisplay dir={dir} os={os} />
        <span style={{ ...ff, color: t.text, wordBreak: 'break-all', lineHeight: 1.5 }}>
          {entry.text}
        </span>
      </div>
    )
  }

  const color = entryColor(entry.kind, os)
  return (
    <pre style={{
      ...ff, color,
      margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      lineHeight: 1.5, animation: 'termEntry 0.15s ease',
    }}>
      {entry.kind === 'error'   && '✗ '}
      {entry.kind === 'success' && '✓ '}
      {entry.kind === 'hint'    && '  Hint: '}
      {entry.kind === 'info'    && '  '}
      {entry.text}
    </pre>
  )
}

// ── Loading spinner line ─────────────────────────────────────────────────────

function LoadingLine({ os }: { os: OS }) {
  const t = THEMES[os]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, animation: 'termEntry 0.15s ease' }}>
      <Loader
        size={12}
        style={{ color: t.output, animation: 'spinLoader 0.8s linear infinite', flexShrink: 0 }}
      />
      <span style={{ fontFamily: t.fontFamily, fontSize: 13, color: t.output }}>running...</span>
    </div>
  )
}

// ── Objective card (game-like) ───────────────────────────────────────────────

function ObjectiveCard({
  step, stepNum, totalSteps, accentColor, os,
  isAnimating, onHint, onSkip,
}: {
  step: ProjectStep
  stepNum: number
  totalSteps: number
  accentColor: string
  os: OS
  isAnimating: boolean
  onHint: () => void
  onSkip: () => void
}) {
  const hintText = os === 'windows' && step.windowsHint ? step.windowsHint : step.hint
  const progress = Math.round(((stepNum - 1) / totalSteps) * 100)

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: `1.5px solid ${accentColor}`,
      borderRadius: 14,
      padding: '20px',
      display: 'flex', flexDirection: 'column', gap: 14,
      animation: 'objectiveIn 0.28s cubic-bezier(0.22,1,0.36,1)',
      boxShadow: `0 0 24px ${accentColor}28`,
    }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Target size={13} style={{ color: accentColor }} />
          <span style={{ ...sans, fontSize: 11, fontWeight: 700, color: accentColor, letterSpacing: '0.08em' }}>
            STEP {stepNum} OF {totalSteps}
          </span>
        </div>
        <span style={{ ...sans, fontSize: 11, color: 'var(--text-muted)' }}>{progress}%</span>
      </div>

      {/* Progress track */}
      <div style={{ background: 'var(--bg-tertiary)', borderRadius: 4, height: 4, overflow: 'hidden' }}>
        <div style={{
          height: 4, borderRadius: 4, background: accentColor,
          width: `${progress}%`, transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Step dots */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} style={{
            width: i < stepNum - 1 ? 18 : 7,
            height: 7, borderRadius: 4,
            background: i < stepNum - 1
              ? accentColor
              : i === stepNum - 1
                ? `${accentColor}bb`
                : 'var(--bg-tertiary)',
            transition: 'all 0.35s ease',
            flexShrink: 0,
          }} />
        ))}
      </div>

      {/* Instruction */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
          {step.instruction}
        </h3>
        {step.detail && (
          <p style={{ ...sans, fontSize: 12, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
            {step.detail}
          </p>
        )}
      </div>

      {/* Expected command chip */}
      <div style={{
        background: 'var(--bg-tertiary)', borderRadius: 8,
        padding: '8px 12px',
        border: '1px solid var(--border)',
      }}>
        <span style={{ ...sans, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          TYPE IN TERMINAL
        </span>
        <p style={{
          ...mono, fontSize: 12, color: 'var(--text-muted)',
          margin: '4px 0 0', opacity: 0.6,
        }}>
          {os === 'windows' && step.windowsHint ? '???' : '???'}&nbsp;
          <span style={{ fontSize: 10 }}>(use Hint to reveal)</span>
        </p>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={onHint}
          disabled={isAnimating}
          style={{
            flex: 1, ...sans, fontSize: 12, fontWeight: 600, cursor: isAnimating ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            background: 'var(--bg-warning)', border: '1px solid var(--border-warning)',
            color: 'var(--text-warning)', borderRadius: 8, padding: '10px 8px',
            opacity: isAnimating ? 0.5 : 1,
          }}
        >
          <Lightbulb size={13} /> Show Hint
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={isAnimating}
          style={{
            flex: 1, ...sans, fontSize: 12, fontWeight: 600, cursor: isAnimating ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            background: 'var(--bg-tertiary)', border: '1px solid var(--border)',
            color: 'var(--text-muted)', borderRadius: 8, padding: '10px 8px',
            opacity: isAnimating ? 0.5 : 1,
          }}
        >
          <SkipForward size={13} /> Skip
        </button>
      </div>

      {/* Hint preview after shown */}
      <div style={{ ...mono, fontSize: 12, color: accentColor, minHeight: 18, opacity: 0.8 }}>
        {hintText && <span style={{ opacity: 0.5, fontSize: 10 }}>hint: </span>}
      </div>
    </div>
  )
}

// ── Step log (quest log) ─────────────────────────────────────────────────────

function StepLog({
  steps, currentStep, completed, accentColor,
}: {
  steps: { instruction: string }[]
  currentStep: number
  completed: boolean
  accentColor: string
}) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 12, padding: '14px 12px',
      display: 'flex', flexDirection: 'column', gap: 2,
      maxHeight: 340, overflowY: 'auto',
    }}>
      <span style={{ ...sans, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.07em', marginBottom: 6, paddingLeft: 4 }}>
        QUEST LOG
      </span>
      {steps.map((step, i) => {
        const done   = i < currentStep || completed
        const active = i === currentStep && !completed
        return (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 9,
              padding: '6px 8px', borderRadius: 7,
              background: active ? 'var(--active-bg)' : 'transparent',
              border: active ? `1px solid ${accentColor}55` : '1px solid transparent',
              opacity: !done && !active ? 0.35 : 1,
              transition: 'all 0.25s ease',
              animation: done ? 'stepDone 0.6s ease' : 'none',
            }}
          >
            <div style={{
              width: 17, height: 17, borderRadius: '50%', flexShrink: 0, marginTop: 1,
              background: done ? accentColor : 'transparent',
              border: `1.5px solid ${done ? 'transparent' : active ? accentColor : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}>
              {done
                ? <CheckCheck size={9} style={{ color: '#fff' }} />
                : <span style={{ ...mono, fontSize: 8, color: active ? accentColor : 'var(--text-muted)' }}>{i + 1}</span>
              }
            </div>
            <span style={{
              ...sans, fontSize: 11, lineHeight: 1.5,
              color: done ? 'var(--text-muted)' : active ? 'var(--text-primary)' : 'var(--text-muted)',
              textDecoration: done ? 'line-through' : 'none',
            }}>
              {step.instruction}
            </span>
          </div>
        )
      })}
      {completed && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px', color: accentColor, animation: 'completePulse 0.6s ease' }}>
          <Trophy size={14} />
          <span style={{ ...sans, fontSize: 12, fontWeight: 700 }}>All steps complete!</span>
        </div>
      )}
    </div>
  )
}

// ── Difficulty badge ─────────────────────────────────────────────────────────

function DifficultyBadge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{ ...sans, fontSize: 11, fontWeight: 700, color, background: bg, borderRadius: 12, padding: '4px 10px' }}>
      {label}
    </span>
  )
}

// ── Completion screen ────────────────────────────────────────────────────────

function CompletionScreen({
  projectId, projectTitle, difficulty, difficultyColor, difficultyBg, commandCount, onRestart,
}: {
  projectId: number; projectTitle: string; difficulty: string
  difficultyColor: string; difficultyBg: string; commandCount: number; onRestart: () => void
}) {
  const nextId = projectId < 9 ? projectId + 1 : null
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
    }}>
      <div style={{
        background: 'var(--bg-secondary)', border: `1.5px solid ${difficultyColor}`,
        borderRadius: 16, padding: '40px 32px', maxWidth: 440, width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        textAlign: 'center', animation: 'completePulse 0.7s ease',
        boxShadow: `0 0 40px ${difficultyColor}30`,
      }}>
        <Trophy size={52} style={{ color: difficultyColor }} strokeWidth={1.5} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <DifficultyBadge label={difficulty} color={difficultyColor} bg={difficultyBg} />
          <h2 style={{ ...sans, fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Project Complete!
          </h2>
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>{projectTitle}</p>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ ...sans, fontSize: 30, fontWeight: 700, color: difficultyColor }}>{commandCount}</span>
            <span style={{ ...sans, fontSize: 11, color: 'var(--text-muted)' }}>commands ran</span>
          </div>
        </div>
        <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          Natapos mo na ang lahat ng steps! Ang mga commands na ito ay gagamitin mo sa tunay na Git workflow.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          {nextId && (
            <a href={`/lessons/practice/${nextId}`} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 20px', borderRadius: 8, background: difficultyColor,
              color: '#fff', ...sans, fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Next Project <ChevronRight size={15} />
            </a>
          )}
          <button type="button" onClick={onRestart} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 20px', borderRadius: 8,
            background: 'var(--bg-tertiary)', border: '1px solid var(--border)',
            color: 'var(--text-muted)', ...sans, fontSize: 14, cursor: 'pointer',
          }}>
            <RotateCcw size={14} /> Restart Project
          </button>
          <a href="/lessons/practice" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 20px', borderRadius: 8,
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-muted)', ...sans, fontSize: 14, textDecoration: 'none',
          }}>
            <ArrowLeft size={14} /> Back to Practice Projects
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const project = getProject(Number(projectId))

  useEffect(() => {
    if (!project) navigate('/lessons/practice', { replace: true })
  }, [project, navigate])

  const [os, setOs] = useState<OS>('mac')
  const [currentStep, setCurrentStep] = useState(0)
  const [history, setHistory] = useState<HistoryEntry[]>([
    { kind: 'info', text: 'Welcome to GitGit Aw Terminal Simulator!' },
    { kind: 'info', text: 'Type Git commands below to complete each step.' },
    { kind: 'info', text: 'Use the Hint or Skip buttons if you get stuck.' },
    { kind: 'info', text: '─────────────────────────────────────────────' },
  ])
  const [input, setInput]           = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1)
  const [currentDir, setCurrentDir] = useState('')
  const [completed, setCompleted]   = useState(false)
  const [commandCount, setCommandCount] = useState(0)
  const [isAnimating, setIsAnimating]   = useState(false)
  const [hintRevealed, setHintRevealed] = useState<string | null>(null)

  const outputRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)
  const animTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => { if (project) setCurrentDir(project.initialDir) }, [project])

  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [history, isAnimating])

  useEffect(() => { if (!isAnimating) inputRef.current?.focus() }, [currentStep, isAnimating])

  // Show step instruction when step advances
  useEffect(() => {
    if (!project || completed) return
    if (currentStep < project.steps.length) {
      const step = project.steps[currentStep]
      setHistory(h => [
        ...h,
        { kind: 'info', text: '─────────────────────────────────────────────' },
        { kind: 'info', text: `Step ${currentStep + 1}/${project.steps.length}: ${step.instruction}` },
      ])
      setHintRevealed(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, project?.id])

  const pushEntries = useCallback((...entries: HistoryEntry[]) => {
    setHistory(h => [...h, ...entries])
  }, [])

  function animateLines(lines: string[], onComplete: () => void) {
    animTimers.current.forEach(clearTimeout)
    animTimers.current = []
    if (!lines.length) { onComplete(); return }
    setIsAnimating(true)

    let delay = 0
    lines.forEach((line, i) => {
      // Progress/remote lines get slightly longer delays for realism
      const isProgressLine = line.includes('%') || line.includes('remote:') || line.includes('...')
      delay += isProgressLine ? 110 + Math.random() * 90 : 55 + Math.random() * 55
      const t = setTimeout(() => {
        setHistory(h => [...h, { kind: 'output', text: line }])
        if (i === lines.length - 1) {
          setIsAnimating(false)
          onComplete()
        }
      }, delay)
      animTimers.current.push(t)
    })
  }

  function processCorrectStep(step: ProjectStep) {
    if (step.newDir) setCurrentDir(step.newDir)
    const lines = step.output ? step.output.split('\n').filter(l => l.trim()) : []
    if (lines.length > 1) {
      animateLines(lines, () => {
        setHistory(h => [...h, { kind: 'success', text: step.successMsg }])
        advanceStep()
      })
    } else {
      if (step.output) pushEntries({ kind: 'output', text: step.output })
      pushEntries({ kind: 'success', text: step.successMsg })
      advanceStep()
    }
  }

  function handleSubmit() {
    if (isAnimating) return
    const cmd = input.trim()
    if (!cmd) return
    setInput('')
    setCmdHistory(h => [cmd, ...h])
    setCmdHistoryIdx(-1)
    setCommandCount(c => c + 1)

    if (cmd === 'hint') {
      if (project && currentStep < project.steps.length) {
        const step = project.steps[currentStep]
        const hintText = os === 'windows' && step.windowsHint ? step.windowsHint : step.hint
        pushEntries({ kind: 'command', text: cmd }, { kind: 'hint', text: hintText })
        setHintRevealed(hintText)
      }
      return
    }

    if (cmd === 'skip') {
      if (project && currentStep < project.steps.length) {
        const step = project.steps[currentStep]
        const hintText = os === 'windows' && step.windowsHint ? step.windowsHint : step.hint
        pushEntries(
          { kind: 'command', text: cmd },
          { kind: 'info', text: `Skipped. The command was: ${hintText}` },
        )
        processCorrectStep(step)
      }
      return
    }

    if (cmd === 'clear') { setHistory([]); return }

    if (!project || currentStep >= project.steps.length) return
    const step = project.steps[currentStep]
    pushEntries({ kind: 'command', text: cmd })

    if (step.check(cmd)) {
      processCorrectStep(step)
    } else {
      const feedback = getErrorFeedback(cmd, step.hint)
      pushEntries(
        { kind: 'error', text: feedback },
        { kind: 'info',  text: 'Type `hint` to see the expected command.' },
      )
    }
  }

  function advanceStep() {
    if (!project) return
    const next = currentStep + 1
    if (next >= project.steps.length) {
      pushEntries(
        { kind: 'info',    text: '─────────────────────────────────────────────' },
        { kind: 'success', text: 'Congratulations! All steps complete!' },
      )
      setCompleted(true)
    } else {
      setCurrentStep(next)
    }
  }

  function handleRestart() {
    if (!project) return
    animTimers.current.forEach(clearTimeout)
    setCurrentStep(0)
    setCompleted(false)
    setCurrentDir(project.initialDir)
    setCommandCount(0)
    setInput('')
    setCmdHistory([])
    setCmdHistoryIdx(-1)
    setIsAnimating(false)
    setHintRevealed(null)
    setHistory([{ kind: 'info', text: '─── Restarting project ───' }])
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1)
      setCmdHistoryIdx(idx)
      setInput(cmdHistory[idx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = cmdHistoryIdx - 1
      if (idx < 0) { setCmdHistoryIdx(-1); setInput('') }
      else { setCmdHistoryIdx(idx); setInput(cmdHistory[idx] ?? '') }
    }
  }

  if (!project) return null

  const accentColor = project.difficultyColor
  const totalSteps  = project.steps.length
  const progressPct = completed ? 100 : Math.round((currentStep / totalSteps) * 100)
  const theme       = THEMES[os]

  const osLabels: Record<OS, string> = {
    windows: 'Windows (PS)',
    mac:     'macOS (zsh)',
    linux:   'Linux (bash)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

      {/* ── Header ── */}
      <div style={{
        padding: '16px 28px 14px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0,
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 11 }}>
          <a href="/lessons/practice" style={{ color: 'var(--text-link)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowLeft size={12} /> Practice Projects
          </a>
          <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
          <span style={{ color: 'var(--text-muted)' }}>Project {project.id}: {project.title}</span>
        </div>

        {/* Title + badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Zap size={16} style={{ color: accentColor, flexShrink: 0 }} />
          <h1 style={{ ...sans, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {project.title}
          </h1>
          <DifficultyBadge label={project.difficulty} color={accentColor} bg={project.difficultyBg} />
          <span style={{ ...sans, fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
            <Clock size={12} /> {completed ? totalSteps : currentStep} / {totalSteps} steps
          </span>
        </div>

        {/* OS selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ ...sans, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            ENVIRONMENT:
          </span>
          {(['windows', 'mac', 'linux'] as OS[]).map(o => (
            <button
              key={o}
              type="button"
              onClick={() => setOs(o)}
              style={{
                ...sans, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                padding: '5px 14px', borderRadius: 20,
                background: os === o ? accentColor : 'var(--bg-tertiary)',
                border: os === o ? `1px solid ${accentColor}` : '1px solid var(--border)',
                color: os === o ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {osLabels[o]}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 4, height: 4, overflow: 'hidden' }}>
          <div style={{
            height: 4, borderRadius: 4, background: accentColor,
            width: `${progressPct}%`, transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* ── Body: left panel + terminal ── */}
      <div style={{
        display: 'flex', flex: 1, gap: 20,
        padding: '20px 28px',
        alignItems: 'flex-start',
      }}>

        {/* Left: Objective + Quest Log */}
        <div style={{
          width: 300, flexShrink: 0,
          display: 'flex', flexDirection: 'column', gap: 12,
          position: 'sticky', top: 20,
          maxHeight: 'calc(100vh - 160px)',
          overflowY: 'auto',
        }}>
          {!completed && currentStep < totalSteps ? (
            <ObjectiveCard
              key={currentStep}
              step={project.steps[currentStep]}
              stepNum={currentStep + 1}
              totalSteps={totalSteps}
              accentColor={accentColor}
              os={os}
              isAnimating={isAnimating}
              onHint={() => {
                const step = project.steps[currentStep]
                const hintText = os === 'windows' && step.windowsHint ? step.windowsHint : step.hint
                pushEntries({ kind: 'hint', text: hintText })
                setHintRevealed(hintText)
              }}
              onSkip={() => {
                if (isAnimating) return
                const step = project.steps[currentStep]
                const hintText = os === 'windows' && step.windowsHint ? step.windowsHint : step.hint
                pushEntries(
                  { kind: 'command', text: hintText },
                  ...(step.output ? [{ kind: 'output' as EntryKind, text: step.output }] : []),
                  { kind: 'success', text: `Skipped → ${step.successMsg}` },
                )
                if (step.newDir) setCurrentDir(step.newDir)
                advanceStep()
              }}
            />
          ) : completed ? (
            <div style={{
              background: 'var(--bg-secondary)', border: `1.5px solid ${accentColor}`,
              borderRadius: 14, padding: '20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              textAlign: 'center', animation: 'completePulse 0.6s ease',
            }}>
              <Trophy size={36} style={{ color: accentColor }} strokeWidth={1.5} />
              <span style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                Project Complete!
              </span>
              <span style={{ ...sans, fontSize: 12, color: 'var(--text-muted)' }}>
                {commandCount} commands used
              </span>
            </div>
          ) : null}

          <StepLog
            steps={project.steps}
            currentStep={currentStep}
            completed={completed}
            accentColor={accentColor}
          />
        </div>

        {/* Right: Terminal */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Terminal window */}
          <div style={{
            background: theme.bg,
            border: '1px solid var(--border)',
            borderRadius: 12,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}>
            <TerminalTitleBar os={os} title={project.title} />

            {/* Output area */}
            <div
              ref={outputRef}
              onClick={() => !isAnimating && inputRef.current?.focus()}
              style={{
                flex: 1, overflowY: 'auto',
                padding: '14px 18px',
                display: 'flex', flexDirection: 'column', gap: 3,
                minHeight: 360, maxHeight: 480,
                cursor: 'text',
              }}
            >
              {history.map((entry, i) => (
                <TerminalEntry key={i} entry={entry} dir={currentDir} os={os} />
              ))}
              {isAnimating && <LoadingLine os={os} />}
            </div>

            {/* Prompt input */}
            {!completed && (
              <div style={{
                borderTop: `1px solid ${isAnimating ? theme.bg : '#2a2a2a'}`,
                padding: '10px 18px',
                display: 'flex', alignItems: 'center', gap: 0,
                flexShrink: 0, background: theme.bg,
              }}>
                <PromptDisplay dir={currentDir} os={os} />
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isAnimating}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                  placeholder={isAnimating ? '' : 'type a command...'}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontFamily: theme.fontFamily, fontSize: 13, color: theme.text,
                    caretColor: theme.promptSym,
                    opacity: isAnimating ? 0.4 : 1,
                  }}
                />
                {!isAnimating && (
                  <button type="button" onClick={handleSubmit} style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: theme.promptSym, display: 'flex', alignItems: 'center', padding: 4,
                  }}>
                    <Send size={13} />
                  </button>
                )}
                {isAnimating && (
                  <Loader size={13} style={{ color: theme.output, animation: 'spinLoader 0.8s linear infinite', flexShrink: 0 }} />
                )}
              </div>
            )}

            {completed && (
              <div style={{
                borderTop: `1px solid ${accentColor}`,
                padding: '12px 18px', background: theme.bg,
                display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
              }}>
                <CheckCircle2 size={15} style={{ color: accentColor }} />
                <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: accentColor }}>
                  All steps complete — scroll down to see results.
                </span>
              </div>
            )}
          </div>

          {/* Hint reveal strip */}
          {hintRevealed && !completed && (
            <div style={{
              background: 'var(--bg-tertiary)', border: '1px solid var(--border-warning)',
              borderRadius: 8, padding: '8px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
              animation: 'termEntry 0.2s ease',
            }}>
              <Lightbulb size={13} style={{ color: 'var(--text-warning)', flexShrink: 0 }} />
              <span style={{ ...sans, fontSize: 12, color: 'var(--text-muted)' }}>Hint:</span>
              <code style={{ ...mono, fontSize: 12, color: 'var(--text-warning)' }}>{hintRevealed}</code>
            </div>
          )}

          {/* Keyboard tips */}
          {!completed && (
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: '2px 2px' }}>
              {[
                { key: 'Enter',  desc: 'Run command' },
                { key: '↑ / ↓', desc: 'Command history' },
                { key: 'hint',   desc: 'Show answer' },
                { key: 'skip',   desc: 'Skip step' },
                { key: 'clear',  desc: 'Clear screen' },
              ].map(k => (
                <div key={k.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <kbd style={{
                    ...mono, fontSize: 10, color: 'var(--text-primary)',
                    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                    borderRadius: 4, padding: '2px 7px',
                  }}>
                    {k.key}
                  </kbd>
                  <span style={{ ...sans, fontSize: 11, color: 'var(--text-muted)' }}>{k.desc}</span>
                </div>
              ))}
            </div>
          )}

          {/* Completion screen */}
          {completed && (
            <CompletionScreen
              projectId={project.id}
              projectTitle={project.title}
              difficulty={project.difficulty}
              difficultyColor={accentColor}
              difficultyBg={project.difficultyBg}
              commandCount={commandCount}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

// ── Error feedback ───────────────────────────────────────────────────────────

function getErrorFeedback(cmd: string, expected: string): string {
  const c = cmd.trim().toLowerCase()

  const recognized = [
    'git', 'mkdir', 'cd', 'touch', 'echo', 'cat', 'ls', 'npm',
    'nano', 'vim', 'new-item', 'ni ', 'get-content', 'type ', 'dir', 'more', 'less',
  ]
  if (!recognized.some(r => c.startsWith(r))) {
    return `Command not recognized: "${cmd}". Only basic terminal and git commands are supported.`
  }

  const exp = expected.trim().toLowerCase()
  const cmdParts = c.split(' ')
  const expParts = exp.split(' ')

  if (cmdParts[0] === 'git' && expParts[0] === 'git' && cmdParts[1] !== expParts[1]) {
    return `Expected a different git command. You used "git ${cmdParts[1]}" — check the step instructions.`
  }

  if (c.startsWith('git commit') && expected.includes('commit')) {
    const msgMatch = cmd.match(/["']([^"']+)["']/)
    if (msgMatch) {
      const msg = msgMatch[1].trim()
      if (!msg.match(/^[a-z]+(\([^)]+\))?:/)) {
        return `Your commit message "${msg}" doesn't follow Conventional Commits format.\nExpected: type: description  (e.g. feat:, fix:, style:)`
      }
    }
    return `Commit command is close but not quite right. Check the expected format.`
  }

  if (c.startsWith('git switch -c') || c.startsWith('git checkout -b')) {
    return `Branch name doesn't match. Check the expected branch name in the step instructions.`
  }

  return `Not quite right. Double-check the command and try again.`
}
