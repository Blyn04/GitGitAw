import React, { useState } from 'react'
import {
  GitMerge, 
  AlertTriangle, 
  Wrench,
  RefreshCw, 
  Scissors, 
  MessageSquare, 
  GitBranch, 
  FileText, 
  Zap,
  CheckCircle2, 
  Terminal, 
  Layers, 
  BookOpen,
  Trophy, 
  Lightbulb, 
  Monitor,
} from 'lucide-react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

function IconBox({ Icon }: { Icon: React.ElementType }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 10,
      background: 'var(--active-bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--accent-dim)',
    }}>
      <Icon size={20} />
    </div>
  )
}

function TipBox({ Icon, label, text, variant = 'green' }: { Icon: React.ElementType; label: string; text: string; variant?: 'green' | 'yellow' }) {
  const isYellow = variant === 'yellow'
  return (
    <div style={{
      background: isYellow ? '#2d1b00' : 'var(--active-bg)',
      border: `1px solid ${isYellow ? '#e3b341' : 'var(--accent-dim)'}`,
      borderRadius: 8, padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: isYellow ? '#e3b341' : 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={14} /> {label}
      </span>
      <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  )
}

// ── Terminal-style conflict block ─────────────────────────────────────

function ConflictBlock({ filename, ours, theirs, oursLabel = 'HEAD', theirsLabel }: {
  filename: string; ours: string; theirs: string; oursLabel?: string; theirsLabel: string
}) {
  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      {/* title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--bg-primary)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['#f85149', '#e3b341', '#3fb950'] as string[]).map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.85 }} />
          ))}
        </div>
        <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)' }}>{filename}</span>
      </div>
      {/* code body */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ ...mono, fontSize: 13, color: '#7ee787' }}>{`<<<<<<< ${oursLabel}`}</span>
        <span style={{ ...mono, fontSize: 13, color: '#58a6ff' }}>{ours}</span>
        <span style={{ ...mono, fontSize: 13, color: 'var(--text-muted)' }}>{'======='}</span>
        <span style={{ ...mono, fontSize: 13, color: '#e3b341' }}>{theirs}</span>
        <span style={{ ...mono, fontSize: 13, color: '#f85149' }}>{`>>>>>>> ${theirsLabel}`}</span>
      </div>
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    num: 'Question 1 of 3',
    q: 'Anong Git command ang ginagamit para makita kung may merge conflict sa iyong working directory?',
    correctIndex: 0,
    wrongIndex: -1,
    opts: ['git status', 'git conflict', 'git check', 'git show'],
    feedback: { correct: 'Tama! git status ang nagpapakita ng mga unmerged files.' },
  },
  {
    num: 'Question 2 of 3',
    q: 'Ano ang meaning ng <<<<<<< HEAD sa isang conflicted file?',
    correctIndex: 1,
    wrongIndex: -1,
    opts: [
      'Katapusan ng conflict section',
      'Simula ng conflict - kasalukuyang branch (HEAD)',
      'Incoming changes mula sa ibang branch',
      'Separator ng dalawang versions',
    ],
    feedback: { correct: 'Tama! Ang HEAD ay ang kasalukuyang branch - ang iyong mga changes.' },
  },
  {
    num: 'Question 3 of 3',
    q: 'Alin ang HINDI dapat gawin pagkatapos mag-resolve ng conflict?',
    correctIndex: -1,
    wrongIndex: 2,
    opts: [
      'I-save ang file pagkatapos mag-edit',
      'I-run ang git add pagkatapos mag-resolve',
      'Kalimutang burahin ang conflict markers (<<<<<<, =======, >>>>>>>)',
      'I-commit ang resolved file',
    ],
    feedback: {
      wrong: 'Ang conflict markers ay dapat laging tanggalin bago mag-commit, o magkakaroon ng broken code ang iyong project!',
    },
  },
]

function QuizSection() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null])
  const [submitted, setSubmitted] = useState(false)

  const getCorrect = (qi: number, oi: number) => {
    const q = QUESTIONS[qi]
    if (q.correctIndex !== -1) return oi === q.correctIndex
    return false
  }
  const getWrong = (qi: number, oi: number) => {
    const q = QUESTIONS[qi]
    return q.wrongIndex === oi
  }

  const calcScore = () => answers.filter((a, i) => a !== null && getCorrect(i, a)).length

  function pick(qi: number, oi: number) {
    if (submitted) return
    setAnswers(prev => prev.map((v, i) => (i === qi ? oi : v)))
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Quick Quiz</h2>
      <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
        Subukan natin kung gaano kayo kagaling sa merge conflicts!
      </p>

      {QUESTIONS.map((q, qi) => (
        <div key={qi} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)' }}>{q.num}</span>
          <p style={{ ...sans, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{q.q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {q.opts.map((opt, oi) => {
              const letters = ['A', 'B', 'C', 'D']
              const isSelected = answers[qi] === oi
              const isCorrect = getCorrect(qi, oi)
              const isWrong = getWrong(qi, oi)

              let bg = 'var(--bg-primary)'
              let border = 'var(--border)'
              let letterColor = 'var(--text-muted)'
              let textColor = 'var(--text-primary)'
              let borderWidth = '1px'

              if (submitted) {
                if (isCorrect)    { bg = '#0d1117'; border = '#238636'; borderWidth = '2px'; letterColor = '#238636'; textColor = '#7ee787' }
                else if (isWrong) { bg = '#2d1b00'; border = '#f85149'; borderWidth = '2px'; letterColor = '#f85149'; textColor = '#f85149' }
              } else if (isSelected) {
                bg = 'var(--active-bg)'; border = 'var(--accent-dim)'
              }

              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => pick(qi, oi)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px', borderRadius: 8,
                    background: bg, border: `${borderWidth} solid ${border}`,
                    cursor: submitted ? 'default' : 'pointer', textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: letterColor, minWidth: 16 }}>{letters[oi]}</span>
                  <span style={{ ...mono, fontSize: 14, color: textColor }}>{opt}</span>
                </button>
              )
            })}
          </div>
          {submitted && (
            <div style={{
              background: QUESTIONS[qi].wrongIndex !== -1 ? '#2d1b00' : '#0d2818',
              borderRadius: 6, padding: '10px 12px',
            }}>
              <p style={{ ...sans, fontSize: 13, color: QUESTIONS[qi].wrongIndex !== -1 ? '#e3b341' : '#3fb950', margin: 0 }}>
                {QUESTIONS[qi].wrongIndex !== -1
                  ? `⚠️ ${QUESTIONS[qi].feedback.wrong}`
                  : `✅ ${QUESTIONS[qi].feedback.correct}`}
              </p>
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          style={{
            ...sans, fontSize: 14, fontWeight: 700, cursor: 'pointer',
            padding: '12px 24px', borderRadius: 8,
            background: 'var(--accent-dim)', color: 'var(--text-on-accent)',
            border: 'none', alignSelf: 'flex-start',
          }}
        >
          I-submit ang Answers
        </button>
      ) : (
        <div style={{ background: '#0d2818', border: '2px solid #238636', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {calcScore() === 3 && (
            <div style={{ background: '#1c3a1c', borderRadius: 8, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...sans, fontSize: 16, fontWeight: 700, color: '#3fb950', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Trophy size={16} /> 3/3 - Conflict Resolver ka na!
              </span>
              <p style={{ ...sans, fontSize: 14, color: '#7ee787', margin: 0 }}>Handa ka na sa Command Cheat Sheet!</p>
            </div>
          )}
          {calcScore() === 2 && (
            <div style={{ background: '#1c2d1c', borderRadius: 8, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...sans, fontSize: 16, fontWeight: 700, color: '#e3b341', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Trophy size={16} /> 2/3 - Malapit na!
              </span>
              <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Balikan ang section tungkol sa conflict markers - kaya mo yan!</p>
            </div>
          )}
          {calcScore() <= 1 && (
            <div style={{ background: '#1a1a1a', borderRadius: 8, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Trophy size={16} /> {calcScore()}/3 - Ayos lang yan!
              </span>
              <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Basahin ulit nang dahan-dahan - kaya mo ito. Hindi kita bibitawan!</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────

export default function MergeConflicts() {
  const { showBackToTop, scrollToTop } = useBackToTop()

  return (
    <div className="lesson-page">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: 'var(--accent-dim)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>Merge Conflicts</span>
      </div>

      {/* Page Header */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h1 className="lesson-page-title" style={{ ...sans, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Merge Conflicts
        </h1>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Huwag matakot - normal na parte ng buhay ng developer ang merge conflict. Ayusin natin ito step by step.
        </p>
      </header>

      {/* Sec1 - Ano ang Merge Conflict */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Ano ang Merge Conflict?
        </h2>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: '#e3b341', display: 'flex', alignItems: 'center', gap: 6 }}>
            <BookOpen size={14} style={{ color: '#e3b341' }} /> Kwento muna tayo...
          </span>
          <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            Ikaw at si Maria ay nag-trabaho sa parehong file. Ikaw ay nag-edit ng line 42, at si Maria ay nag-edit din ng line 42 - iba ang inyong mga changes. Ngayon, kapag ni-merge mo ang kanyang branch sa iyo, hindi alam ng Git kung alin ang tama. Ito ang tinatawag na Merge Conflict.
          </p>
        </div>

        <div className="lesson-cards-row">
          {([
            { Icon: GitMerge,     title: 'Dalawang Edit',     desc: 'Parehong file, parehong linya, iba ang laman' },
            { Icon: AlertTriangle,title: 'Hindi Alam ng Git', desc: 'Kailangan mong magdesisyon kung alin ang tamang version' },
            { Icon: Wrench,       title: 'Kaya Mong Ayusin',  desc: 'May mga tools at steps para maayos ito nang maayos' },
          ] as { Icon: React.ElementType; title: string; desc: string }[]).map(c => (
            <div key={c.title} style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <IconBox Icon={c.Icon} />
              <h3 style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h3>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sec2 - Bakit Nagkakaroon */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Bakit Nagkakaroon ng Conflict?
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Narito ang tatlong karaniwang dahilan ng merge conflicts:
        </p>

        <div className="lesson-cards-row">
          {[
            { num: 1, title: 'Parehong Linya',   desc: 'Dalawang tao ang nag-edit ng eksaktong parehong linya sa parehong file.' },
            { num: 2, title: 'Deleted File',      desc: 'Bini-modify ng isang tao ang file na binura naman ng isa.' },
            { num: 3, title: 'Matagal na Branch', desc: 'Ang branch ay hindi na-update sa matagal na panahon at maraming changes na ang naipon sa main.' },
          ].map(c => (
            <div key={c.num} style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: '#2d1b00', borderRadius: 6, padding: '4px 10px', alignSelf: 'flex-start' }}>
                <span style={{ ...mono, fontSize: 11, fontWeight: 700, color: '#e3b341' }}>
                  <AlertTriangle size={10} style={{ display: 'inline', marginRight: 4 }} />
                  Cause {c.num}
                </span>
              </div>
              <h3 style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h3>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sec3 - Hitsura ng Conflict */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Hitsura ng Merge Conflict
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Ganito ang makikita mo sa file kapag may conflict:
        </p>

        <ConflictBlock
          filename="style.css"
          ours="color: blue;  /* iyong version */"
          theirs="color: red;   /* kanilang version */"
          theirsLabel="feature/new-color"
        />

        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Anatomy ng Conflict Markers</h3>
          {[
            { tag: '<<<<<<< HEAD',    tagBg: '#1c3a1c', tagColor: '#7ee787', desc: 'Simula ng conflict - ito ang iyong version (current branch)' },
            { tag: '=======',         tagBg: 'var(--bg-tertiary)', tagColor: 'var(--text-muted)', desc: 'Separator ng dalawang versions' },
            { tag: '>>>>>>> branch',  tagBg: '#3a1c1c', tagColor: '#f85149', desc: 'Katapusan ng conflict - ito ang incoming version' },
          ].map(row => (
            <div key={row.tag} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: row.tagBg, borderRadius: 4, padding: '3px 8px', flexShrink: 0 }}>
                <span style={{ ...mono, fontSize: 11, color: row.tagColor }}>{row.tag}</span>
              </div>
              <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>{row.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sec4 - Paano Ayusin */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Paano Ayusin ang Conflict
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Mula conflict hanggang resolved - step by step.
        </p>

        {[
          {
            num: '1', title: 'I-run ang git status',
            body: (
              <div style={{ background: 'var(--bg-primary)', borderRadius: 6, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ ...mono, fontSize: 13, color: '#7ee787' }}>$ git status</span>
                <span style={{ ...mono, fontSize: 13, color: '#f85149' }}>both modified:   src/style.css</span>
              </div>
            ),
          },
          {
            num: '2', title: 'Buksan ang conflicted file',
            body: <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Hanapin ang conflict markers ({'<<<<<<<'}, {'======='}, {'>>>>>>>'}) at piliin kung alin ang itatago.</p>,
          },
          {
            num: '3', title: 'I-edit ang file - tanggalin ang markers',
            body: (
              <div style={{ background: '#2d1b00', borderRadius: 6, padding: '10px 12px' }}>
                <span style={{ ...sans, fontSize: 13, color: '#e3b341', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertTriangle size={13} /> Siguraduhing walang natitira na conflict markers bago mag-save!
                </span>
              </div>
            ),
          },
          {
            num: '4', title: 'I-run ang git add',
            body: (
              <>
                <div style={{ background: 'var(--bg-primary)', borderRadius: 6, padding: '12px 14px' }}>
                  <span style={{ ...mono, fontSize: 13, color: '#7ee787' }}>$ git add src/style.css</span>
                </div>
                <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
                  I-mark ang file bilang resolved para malaman ng Git na ayos na ito.
                </p>
              </>
            ),
          },
          {
            num: '5', title: 'I-commit ang resolution',
            body: (
              <div style={{ background: 'var(--bg-primary)', borderRadius: 6, padding: '12px 14px' }}>
                <span style={{ ...mono, fontSize: 13, color: '#7ee787' }}>$ git commit -m "Resolve merge conflict in style.css"</span>
              </div>
            ),
          },
        ].map(step => (
          <div key={step.num} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: '#fff' }}>{step.num}</span>
              </div>
              <h3 style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{step.title}</h3>
            </div>
            {step.body}
          </div>
        ))}

        <div style={{ background: '#0d2818', border: '1px solid #238636', borderRadius: 8, padding: '14px 16px' }}>
          <span style={{ ...sans, fontSize: 14, color: '#3fb950', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={14} style={{ color: '#3fb950' }} />
            Tapos na! Ang conflict ay naayos na at naka-commit sa iyong branch.
          </span>
        </div>
      </section>

      {/* Sec5 - VS Code */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          VS Code Conflict Resolver
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Pinakamadaling paraan para mag-resolve ng conflicts.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Monitor size={16} style={{ color: 'var(--accent-dim)' }} />
            <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
              Kapag may conflict, awtomatikong nagpapakita ang VS Code ng mga button sa itaas ng bawat conflict section:
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Accept Current Change',  desc: 'Gamitin ang iyong version (HEAD)',         border: '#238636', color: '#7ee787' },
            { label: 'Accept Incoming Change', desc: 'Gamitin ang kanilang version',              border: '#58a6ff', color: '#58a6ff' },
          ].map(b => (
            <div key={b.label} style={{ flex: '1 1 200px', background: 'var(--bg-secondary)', border: `1px solid ${b.border}`, borderRadius: 8, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: b.color }}>{b.label}</span>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Accept Both Changes', desc: 'Pagsabayin ang dalawang versions', border: '#e3b341', color: '#e3b341' },
            { label: 'Compare Changes',     desc: 'Tingnan ang side-by-side comparison', border: 'var(--border)', color: 'var(--text-muted)' },
          ].map(b => (
            <div key={b.label} style={{ flex: '1 1 200px', background: 'var(--bg-secondary)', border: `1px solid ${b.border}`, borderRadius: 8, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: b.color }}>{b.label}</span>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <TipBox Icon={Lightbulb} label="Pro Tip" text="I-install ang GitLens extension sa VS Code para mas madaling makita ang history ng bawat line at kung sino ang may-gawa ng bawat change." />
      </section>

      {/* Sec6 - Paano Iwasan */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Paano Iwasan ang Conflicts
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Mas mabuti ang pag-iwas kaysa pag-aayos.
        </p>

        {[
          [
            { Icon: RefreshCw,     title: 'Mag-pull Lagi',      desc: 'I-run ang git pull bago magsimulang mag-code' },
            { Icon: Scissors,      title: 'Maliliit na Commits', desc: 'Huwag hayaang matagal ang branch bago i-merge' },
            { Icon: MessageSquare, title: 'Makipag-usap',       desc: 'Sabihin sa teammates kung anong file ang iyong inaayos' },
          ],
          [
            { Icon: GitBranch, title: 'Gamitin ang Branches', desc: 'Bawat feature ay dapat nasa sariling branch' },
            { Icon: FileText,  title: 'Code Review',          desc: 'Mag-review ng code bago i-merge para maiwasan ang overlap' },
            { Icon: Zap,       title: 'Mabilis na Merge',     desc: 'Huwag patagalin ang open na PR - i-merge agad kapag ready na' },
          ],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(row as { Icon: React.ElementType; title: string; desc: string }[]).map(c => (
              <div key={c.title} style={{ flex: '1 1 170px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <c.Icon size={18} style={{ color: 'var(--accent-dim)' }} />
                <h3 style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h3>
                <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Sec7 - git stash */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          git stash
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Kapag kailangan mong lumipat ng branch pero hindi pa tapos ang trabaho mo.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Terminal size={14} style={{ color: 'var(--accent-dim)' }} /> Mga Pangunahing Stash Commands
          </h3>
          <div style={{ background: 'var(--bg-primary)', borderRadius: 6, padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ ...mono, fontSize: 13, color: '#7ee787' }}>$ git stash          # I-save ang changes temporarily</span>
            <span style={{ ...mono, fontSize: 13, color: '#7ee787' }}>$ git stash pop      # I-restore ang pinakabagong stash</span>
            <span style={{ ...mono, fontSize: 13, color: '#7ee787' }}>$ git stash list     # Tingnan lahat ng stash</span>
            <span style={{ ...mono, fontSize: 13, color: '#f85149' }}>$ git stash drop     # Burahin ang stash</span>
          </div>
          <div style={{ background: 'var(--bg-primary)', borderRadius: 8, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ ...sans, fontSize: 12, fontWeight: 700, color: '#e3b341', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={12} /> Typical Workflow
            </span>
            <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>1. Nag-eeedit ka pero kailangan mong mag-fix ng bug sa main</span>
            <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>2. git stash → lumipat sa main → nag-fix → bumalik sa branch</span>
            <span style={{ ...sans, fontSize: 13, color: '#7ee787' }}>3. git stash pop → nandoon pa rin ang iyong mga changes!</span>
          </div>
        </div>
      </section>

      {/* Sec8 - git rebase */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          git rebase
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Isang advanced na paraan ng pag-integrate ng changes mula sa ibang branch.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 220px', background: 'var(--bg-secondary)', border: '1px solid #58a6ff', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: '#58a6ff' }}>git merge</span>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Pinagsasama ang dalawang branches at lumilikha ng merge commit. Ligtas at madaling gamitin.
            </p>
            <div style={{ background: '#1c2d3a', borderRadius: 4, padding: '3px 8px', alignSelf: 'flex-start' }}>
              <span style={{ ...sans, fontSize: 11, color: '#58a6ff' }}>
                <CheckCircle2 size={10} style={{ display: 'inline', marginRight: 4 }} />
                Recommended para sa beginners
              </span>
            </div>
          </div>
          <div style={{ flex: '1 1 220px', background: 'var(--bg-secondary)', border: '1px solid #e3b341', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: '#e3b341' }}>git rebase</span>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Inililipat ang iyong commits sa ibabaw ng target branch para mas malinis ang history.
            </p>
            <div style={{ background: '#2d2200', borderRadius: 4, padding: '3px 8px', alignSelf: 'flex-start' }}>
              <span style={{ ...sans, fontSize: 11, color: '#e3b341' }}>
                <AlertTriangle size={10} style={{ display: 'inline', marginRight: 4 }} />
                Para sa mga may karanasan
              </span>
            </div>
          </div>
        </div>

        <TipBox Icon={AlertTriangle} variant="yellow" label="Golden Rule"
          text="Huwag kailanman mag-rebase ng shared branches tulad ng main o develop. Gamitin lamang sa sarili mong feature branches." />
        <TipBox Icon={Lightbulb} label="Para sa mga baguhan"
          text="Magsimula sa git merge. Pag-aralan ang git rebase kapag komportable ka na sa Git workflow." />
      </section>

      {/* Sec9 - Commands Table */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Kapaki-pakinabang na Commands
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Quick reference para sa lahat ng kailangan mo sa conflict resolution.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          {/* header */}
          <div style={{ display: 'flex', gap: 16, background: 'var(--bg-primary)', padding: '12px 16px' }}>
            <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: '#58a6ff', flex: '0 0 260px' }}>Command</span>
            <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: '#58a6ff' }}>Ano ang Ginagawa</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          {[
            { cmd: 'git status',                        cmdColor: '#7ee787', desc: 'Tingnan kung may conflicts',        alt: false },
            { cmd: 'git diff',                          cmdColor: '#7ee787', desc: 'Tingnan ang differences',           alt: true  },
            { cmd: 'git add <file>',                    cmdColor: '#7ee787', desc: 'I-mark as resolved',               alt: false },
            { cmd: 'git commit',                        cmdColor: '#7ee787', desc: 'I-finalize ang resolution',         alt: true  },
            { cmd: 'git merge --abort',                 cmdColor: '#f85149', desc: 'I-cancel ang merge',               alt: false },
            { cmd: 'git checkout --ours <file>',        cmdColor: '#e3b341', desc: 'Gamitin ang iyong version',        alt: true  },
            { cmd: 'git checkout --theirs <file>',      cmdColor: '#e3b341', desc: 'Gamitin ang kanilang version',     alt: false },
            { cmd: 'git log --merge',                   cmdColor: '#7ee787', desc: 'Tingnan ang conflicting commits',  alt: true  },
          ].map((row, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 16px', background: row.alt ? 'var(--bg-primary)' : 'transparent' }}>
                <span style={{ ...mono, fontSize: 13, color: row.cmdColor, flex: '0 0 260px' }}>{row.cmd}</span>
                <span style={{ ...sans, fontSize: 13, color: 'var(--text-primary)' }}>{row.desc}</span>
              </div>
              {i < 7 && <div style={{ height: 1, background: 'var(--bg-tertiary)' }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Sec10 - Real World Scenario */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Real World Conflict Scenario
        </h2>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: '#e3b341', display: 'flex', alignItems: 'center', gap: 6 }}>
            <BookOpen size={13} style={{ color: '#e3b341' }} /> Scenario
          </span>
          <p style={{ ...sans, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
            Ikaw at si Maria ay nag-edit ng parehong file na README.md. Pareho kayong nag-commit sa inyong mga branch, at ngayon kailangan mong i-merge ang kanyang changes sa iyong branch.
          </p>
        </div>

        <ConflictBlock
          filename="README.md"
          ours="Ito ang pinakamahusay na Git tutorial sa Pilipinas!"
          oursLabel="HEAD (Current Change)"
          theirs="Ang pinakamagandang Git tutorial para sa mga Pilipino!"
          theirsLabel="maria-branch (Incoming Change)"
        />

        <div style={{ background: '#0d2818', border: '1px solid #238636', borderRadius: 10, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...sans, fontSize: 18, fontWeight: 700, color: '#3fb950', display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={18} style={{ color: '#3fb950' }} /> Resolved!
          </span>
          <div style={{ background: 'var(--bg-primary)', borderRadius: 6, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ ...mono, fontSize: 13, color: 'var(--text-primary)'}}># GitGit Aw</span>
            <span style={{ ...mono, fontSize: 13, color: '#7ee787' }}>Ito ang pinakamahusay na Git tutorial sa Pilipinas!</span>
          </div>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            Pinili mo ang iyong version. Tinanggal mo na ang conflict markers at na-save ang file.
          </p>
        </div>

        <TipBox Icon={MessageSquare} label="Bago mag-resolve ng conflict"
          text="Makipag-usap muna sa teammate. Mas madali ang resolution kapag alam mo kung ano ang intensyon ng bawat isa." />
      </section>

      {/* Sec11 - Quick Quiz */}
      <QuizSection />

      {/* Sec12 - Next Steps */}
      <div style={{ background: 'var(--accent-dim)', borderRadius: 16, padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ ...sans, fontSize: 32, fontWeight: 700, color: '#ffffff', margin: 0 }}>
          Ayos! Hindi ka na matatakot sa Merge Conflicts.
        </h3>
        <p style={{ ...sans, fontSize: 16, color: '#b5f5c0', lineHeight: 1.5, margin: 0 }}>
          Next: Command Cheat Sheet - lahat ng madalas gamitin na Git commands nasa iisang lugar para mabilis mong ma-review.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          <a
            href="/lessons/cheat-sheet"
            style={{ padding: '14px 20px', borderRadius: 8, background: '#ffffff', color: 'var(--accent-dim)', ...sans, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            Command Cheat Sheet →
          </a>
          <a
            href="/lessons/collaboration"
            style={{ padding: '14px 20px', borderRadius: 8, background: 'transparent', border: '2px solid #ffffff', color: '#ffffff', ...sans, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}
          >
            ← Collaboration
          </a>
        </div>
      </div>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
