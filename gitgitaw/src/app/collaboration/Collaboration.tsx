import React, { useState } from 'react'
import {
  Users, Shield, FileText, Zap,
  Briefcase, GitFork, Lightbulb, Lock, Trophy,
  GitBranch, GitMerge, Tag, Target, Search, MessageSquare,
  CheckCircle2, Clock, RefreshCw, Trash2, BarChart2, Calendar,
  User, ClipboardList, Layers, GitCommit,
  BookOpen, Heart, LayoutList, CheckCheck,
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

function TipBox({ Icon, label, text }: { Icon: React.ElementType; label: string; text: string }) {
  return (
    <div style={{ background: 'var(--active-bg)', border: '1px solid var(--accent-dim)', borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={14} /> {label}
      </span>
      <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  )
}

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '8px 14px' }}>
        <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          style={{ ...mono, fontSize: 12, cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, color: copied ? 'var(--accent)' : 'var(--text-muted)' }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div style={{ height: 1, background: 'var(--border)' }} />
      <div style={{ padding: '12px 16px' }}>
        <pre style={{ ...mono, fontSize: 13, color: 'var(--accent)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
      </div>
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    q: 'Q1: Ano ang tamang paraan para mag-contribute sa isang open-source project na wala kang write access?',
    opts: [
      { letter: 'A', text: 'Direktang mag-push sa main branch ng original repo', correct: false },
      { letter: 'B', text: 'I-fork ang repo, gumawa ng changes, mag-open ng Pull Request', correct: true },
      { letter: 'C', text: 'Mag-email ng code sa maintainer', correct: false },
    ],
  },
  {
    q: 'Q2: Ang code review ay para saan?',
    opts: [
      { letter: 'A', text: 'Para mapahiya ang developer na gumawa ng code', correct: false },
      { letter: 'B', text: 'Para mapabagal ang development process', correct: false },
      { letter: 'C', text: 'Para mapabuti ang code quality at maiwasan ang bugs', correct: true },
    ],
  },
  {
    q: 'Q3: Alin sa mga ito ang HINDI dapat gawin bago mag-open ng Pull Request?',
    opts: [
      { letter: 'A', text: 'Mag-test ng sariling code', correct: false },
      { letter: 'B', text: 'Magsulat ng malinaw na PR description', correct: false },
      { letter: 'C', text: "Mag-merge nang walang review dahil 'sigurado ka'", correct: false, wrong: true },
    ],
  },
]

function QuizSection() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null])
  const [submitted, setSubmitted] = useState(false)

  const score = submitted ? answers.filter((a, i) => a !== null && QUESTIONS[i].opts[a].correct).length : 0

  function pick(qi: number, oi: number) {
    if (submitted) return
    setAnswers(prev => prev.map((v, i) => (i === qi ? oi : v)))
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Quick Quiz</h2>
      <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
        Subukan ang iyong natutunang kaalaman tungkol sa Git collaboration!
      </p>

      {QUESTIONS.map((q, qi) => (
        <div key={qi} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{q.q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {q.opts.map((opt, oi) => {
              const isSelected = answers[qi] === oi
              const isCorrect = opt.correct
              const isWrong = (opt as { wrong?: boolean }).wrong

              let bg = 'var(--bg-tertiary)'
              let border = 'var(--border)'
              let letterColor = 'var(--text-muted)'
              let textColor = 'var(--text-muted)'

              if (submitted) {
                if (isCorrect)      { bg = '#1c2b1c'; border = '#238636'; letterColor = '#238636'; textColor = '#238636' }
                else if (isWrong)   { bg = '#2d1b1b'; border = '#da3633'; letterColor = '#da3633'; textColor = '#da3633' }
              } else if (isSelected) {
                bg = 'var(--active-bg)'; border = 'var(--accent-dim)'
              }

              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => pick(qi, oi)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', borderRadius: 8,
                    background: bg, border: `1px solid ${border}`,
                    cursor: submitted ? 'default' : 'pointer', textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: letterColor }}>{opt.letter}</span>
                  <span style={{ ...sans, fontSize: 13, color: textColor }}>{opt.text}</span>
                </button>
              )
            })}
          </div>
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
        <div style={{ background: 'var(--active-bg)', border: '1px solid var(--accent-dim)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Trophy size={18} style={{ color: 'var(--accent-dim)' }} />
            {score === 3
              ? '3/3 — Perpekto! Master ka na ng Collaboration!'
              : score === 2
              ? '2/3 — Magaling! Basahin ulit ang mga seksyong hindi mo nasagot.'
              : '0–1/3 — Okay lang! Basahin muli ang buong page at subukang muli.'}
          </span>
        </div>
      )}
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────

export default function Collaboration() {
  const { showBackToTop, scrollToTop } = useBackToTop()

  return (
    <div className="lesson-page">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: 'var(--accent-dim)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>Collaboration</span>
      </div>

      {/* Page Header */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h1 className="lesson-page-title" style={{ ...sans, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Collaboration
        </h1>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Pag-aralan kung paano magtulungan ang mga developer gamit ang Git at GitHub para sa mas epektibong software development.
        </p>
      </header>

      {/* Sec1 — Bakit Mahalaga */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Bakit Mahalaga ang Collaboration?
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Sa totoong mundo ng software development, hindi ka nag-iisa. Ang bawat project ay may maraming developer na nagtatrabaho sabay. Kaya kailangan mong malaman kung paano magtulungan nang maayos.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={16} style={{ color: 'var(--accent-dim)' }} />
            Ang Kwento ng Team
          </span>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Isipin mo: ikaw at 5 katrabaho mo ay nag-aayos ng isang malaking app. Iba-ibang tao ang nagtatrabaho sa iba-ibang features. Paano kayo mag-iingat na hindi masira ang trabaho ng isa't isa?
          </p>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Dito pumapasok ang collaboration tools ng Git at GitHub: branches, pull requests, at code reviews. Ang mga ito ang nagbibigay ng sistema para magtulungan nang walang kaguluhan.
          </p>
        </div>

        <div className="lesson-cards-row">
          {([
            { Icon: Users,    title: 'Team Sync',          desc: 'Lahat ng miyembro ay nasa iisang page. Walang overwriting ng trabaho ng iba.' },
            { Icon: Shield,   title: 'Code Protection',    desc: 'Ang main branch ay protektado. Walang hindi na-review na code ang mapapasok.' },
            { Icon: FileText, title: 'History Tracking',   desc: 'Bawat pagbabago ay naka-record. Madaling malaman kung sino ang nag-change ng ano at kailan.' },
            { Icon: Zap,      title: 'Faster Development', desc: 'Sabay-sabay na nagtatrabaho ang team. Hindi kailangang hintayin ang isa bago magsimula.' },
          ] as { Icon: React.ElementType; title: string; desc: string }[]).map(c => (
            <div key={c.title} style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <IconBox Icon={c.Icon} />
              <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h3>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sec2 — Dalawang Paraan */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Dalawang Paraan ng Collaboration
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          May dalawang pangunahing paraan ng pakikipagtulungan sa GitHub. Ang pinili mong paraan ay depende sa uri ng iyong project.
        </p>

        <div className="lesson-cards-row">
          {([
            {
              Icon: Briefcase, title: 'Shared Repository',
              desc: 'Lahat ng miyembro ay may direct access sa iisang repository. Gumagawa ng branches para sa bawat feature, tapos nag-o-open ng Pull Request para i-merge.',
              best: 'Best for: Mga close-knit teams, company projects',
              flow: 'Clone → Branch → Push → Pull Request → Merge',
            },
            {
              Icon: GitFork, title: 'Fork and Pull',
              desc: 'Nag-fo-fork ka ng sariling kopya ng repository. Doon ka nag-wowork, tapos nag-o-open ng Pull Request sa original repository para i-propose ang iyong changes.',
              best: 'Best for: Open-source projects, external contributions',
              flow: 'Fork → Clone → Branch → Push → Pull Request → Merge',
            },
          ] as { Icon: React.ElementType; title: string; desc: string; best: string; flow: string }[]).map(m => (
            <div key={m.title} style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <IconBox Icon={m.Icon} />
              <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{m.title}</h3>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{m.best}</span>
              <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)' }}>{m.flow}</span>
            </div>
          ))}
        </div>

        <TipBox
          Icon={Lightbulb}
          label="Pro Tip"
          text="Sa trabaho, kadalasan Shared Repository ang gamit. Ikaw ay miyembro ng team na may access sa repo. Ang Fork and Pull naman ay karaniwan sa open-source na gusto mong i-contribute kahit hindi ka official member."
        />
      </section>

      {/* Sec3 — Pull Requests */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Pull Requests (PRs)
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Ang Pull Request ay ang opisyal na paraan ng pag-propose ng changes sa isang repository. Dito nangyayari ang code review at discussion bago i-merge ang code.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Ano ang Pull Request?</h3>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Ang Pull Request (o PR) ay isang request na i-merge ang iyong branch sa ibang branch (kadalasan main o develop). Hindi ito automatic, kailangan munang suriin ng iyong team.
          </p>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Sa loob ng PR, makikita ng iyong mga teammates ang lahat ng changes na ginawa mo, line by line. Puwede silang mag-comment, mag-suggest ng changes, o mag-approve ng iyong code.
          </p>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Ang PR ay hindi lang tungkol sa code, ito ay tungkol sa komunikasyon at kalidad. Bawat PR ay isang pagkakataon para matuto mula sa iyong team at mapabuti ang iyong code.
          </p>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>PR Anatomy</h3>
          {([
            { Icon: ClipboardList, label: 'Title',       desc: 'Malinaw na summary ng ginawang changes' },
            { Icon: FileText,      label: 'Description', desc: 'Detalye ng changes, bakit ginawa, at paano i-test' },
            { Icon: User,          label: 'Reviewers',   desc: 'Mga taong magre-review ng code mo' },
            { Icon: Tag,           label: 'Labels',      desc: 'Kategorya ng PR (bug, feature, docs, etc.)' },
            { Icon: Target,        label: 'Milestone',   desc: 'Kung saang release o sprint kabilang ang PR' },
            { Icon: CheckCheck,    label: 'Checks',      desc: 'Automated tests at CI/CD status bago i-merge' },
          ] as { Icon: React.ElementType; label: string; desc: string }[]).map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <row.Icon size={16} style={{ color: 'var(--accent-dim)', flexShrink: 0 }} />
              <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', minWidth: 100 }}>{row.label}</span>
              <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>{row.desc}</span>
            </div>
          ))}
        </div>

        <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Good PR Description Template</h3>
        <CodeBlock language="markdown" code={`## Ano ang ginawa ko?
Nag-implement ng [feature name] para sa [reason].

## Bakit kailangan ito?
- [Problem 1 na nireresolba]
- [Problem 2 na nireresolba]

## Paano i-test?
1. [Step 1]
2. [Step 2]

## Screenshots (kung meron)
[Add screenshots here]

## Checklist
- [ ] Nag-run ng tests
- [ ] Nag-update ng docs
- [ ] Walang console.log na naiwan`} />
      </section>

      {/* Sec4 — Paano Gumawa ng PR */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Paano Gumawa ng Pull Request
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Sundan ang mga hakbang na ito para matagumpay na makapagsumite ng iyong unang Pull Request.
        </p>

        {[
          {
            num: '1', title: 'Gumawa ng Branch',
            desc: 'Laging gumawa ng bagong branch para sa bawat feature o bug fix. Huwag mag-commit direkta sa main.',
            code: 'git checkout -b feature/your-feature-name',
          },
          {
            num: '2', title: 'I-push ang Branch sa GitHub',
            desc: 'Pagkatapos mag-commit ng iyong changes, i-push ang iyong branch sa GitHub para maging visible ito sa iyong team.',
            code: 'git push origin feature/your-feature-name',
          },
        ].map(step => (
          <div key={step.num} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>{step.num}</span>
              <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{step.title}</h3>
            </div>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            <CodeBlock code={step.code} />
          </div>
        ))}

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>3</span>
            <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>I-click ang 'Compare & pull request'</h3>
          </div>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Pagkatapos mag-push, makikita mo sa GitHub ang isang yellow banner na nagsasabing 'Compare & pull request'. I-click ito para magsimula ng PR creation.
          </p>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Sa PR form:{'\n'}• Base branch: main (ang branch na papunta ang iyong code){'\n'}• Compare branch: ang iyong feature branch{'\n'}• Lagyan ng malinaw na title at description
          </p>
          <TipBox Icon={Lightbulb} label="Tip" text="Siguraduhing tama ang base at compare branch bago mag-submit. Mali-mali ito pag unang beses!" />
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>4</span>
            <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Mag-assign ng Reviewer</h3>
          </div>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Sa kanang bahagi ng PR form, may 'Reviewers' section. I-assign ang iyong team lead o katrabaho na mag-re-review ng iyong code. Pag wala kang alam, tanungin ang iyong team kung sino ang dapat mag-review.
          </p>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>5</span>
            <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>I-merge kapag Approved</h3>
          </div>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Kapag nag-approve na ang reviewer, maaari mo nang i-merge ang PR. May tatlong opsyon:
          </p>
          {([
            { Icon: GitMerge,  name: 'Merge Commit',     desc: 'Pinagsama ang lahat ng commits, may merge commit sa history' },
            { Icon: Layers,    name: 'Squash and Merge', desc: 'Pinagsama ang lahat ng commits sa isa, mas malinis ang history' },
            { Icon: GitCommit, name: 'Rebase and Merge', desc: 'Inilipat ang commits sa dulo ng main, linear na history' },
          ] as { Icon: React.ElementType; name: string; desc: string }[]).map(m => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <m.Icon size={16} style={{ color: 'var(--accent-dim)', flexShrink: 0 }} />
              <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', minWidth: 150 }}>{m.name}</span>
              <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>{m.desc}</span>
            </div>
          ))}
        </div>

        <TipBox Icon={Clock}    label="Habang Naghihintay ng Review" text="Habang naghihintay ng review, maaari kang mag-work sa ibang bagay. Huwag mag-force ng merge. Respeto ang susi sa maayos na collaboration." />
        <TipBox Icon={BookOpen} label="Para sa mga Beginner"         text="Gamitin muna ang Squash and Merge — mas malinis ang iyong git history at mas madaling i-track ang mga changes sa project." />
      </section>

      {/* Sec5 — Code Review */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Code Review</h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Ang code review ay ang proseso ng pagsusuri ng code ng ibang developer bago ito i-merge. Ito ay isa sa pinakamahalagang bahagi ng collaboration.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Para sa Reviewers</h3>
            {([
              { Icon: Target,        title: 'Maging Specific',       desc: "Huwag lang sabihing 'Mali ito.' Sabihin kung bakit at ano ang mas mainam na gawin." },
              { Icon: MessageSquare, title: 'Maging Constructive',   desc: 'Ang layunin ay mapabuti ang code, hindi mapahiya ang author. Magbigay ng suggestions, hindi criticisms.' },
              { Icon: CheckCircle2,  title: 'Approve Kapag Handa',   desc: 'Huwag mag-nitpick ng walang halaga. Kapag okay na ang code at safe na i-merge, i-approve na.' },
              { Icon: Search,        title: 'Tingnan ang Logic',     desc: 'Huwag lang tingnan ang style — tingnan din ang logic, edge cases, at performance.' },
            ] as { Icon: React.ElementType; title: string; desc: string }[]).map(c => (
              <div key={c.title} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <c.Icon size={18} style={{ color: 'var(--accent-dim)' }} />
                <h4 style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h4>
                <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Para sa PR Author</h3>
            {([
              { Icon: Heart,        title: 'Huwag Maging Defensive',     desc: 'Ang review ay tungkol sa code, hindi sa iyo. Tanggapin ang feedback nang bukas ang isip.' },
              { Icon: Lightbulb,    title: 'Magtanong Kung Hindi Malinaw', desc: 'Kung hindi mo maintindihan ang comment ng reviewer, magtanong. Mas magaling ang nagtatanong kaysa sa nagtatago ng ignorance.' },
              { Icon: CheckCircle2, title: 'Mark as Resolved',           desc: "Pagkatapos ayusin ang binago, i-mark ang conversation bilang 'Resolved' para malaman ng reviewer na naalagaan na ito." },
              { Icon: RefreshCw,    title: 'Be Open to Changes',         desc: 'Minsan, mas magaling ang reviewer sa isang partikular na area. Maging bukas sa mas magandang solusyon.' },
            ] as { Icon: React.ElementType; title: string; desc: string }[]).map(c => (
              <div key={c.title} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <c.Icon size={18} style={{ color: 'var(--accent-dim)' }} />
                <h4 style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h4>
                <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sec6 — Forking */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Forking</h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Ang forking ay ang paraan ng pag-contribute sa mga proyektong hindi ka official member. Ito ang pundasyon ng open-source collaboration.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <GitFork size={16} style={{ color: 'var(--accent-dim)' }} />
            Ano ang Fork?
          </span>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Ang fork ay isang personal na kopya ng ibang tao o organisasyon na repository. Kapag nag-fork ka, may sarili kang version ng repo na nasa iyong account.
          </p>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Hindi mo mababago ang original repo nang direkta, kailangan mong mag-open ng Pull Request mula sa iyong fork. Ito ang nagpoprotekta sa original project mula sa unauthorized changes.
          </p>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Halimbawa: Gusto mong mag-contribute sa isang popular na open-source library. I-fork mo ito, gumawa ng changes sa iyong fork, tapos mag-open ng PR sa original repo.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8 }}>
          {(['Fork', '→', 'Clone', '→', 'Branch', '→', 'Push', '→', 'Pull Request'] as string[]).map((item, i) => (
            <span key={i} style={{ ...mono, fontSize: 13, color: item === 'Fork' ? 'var(--accent)' : item === '→' ? 'var(--border)' : 'var(--text-muted)', fontWeight: item === 'Fork' ? 700 : 400 }}>{item}</span>
          ))}
        </div>

        <CodeBlock code={`# 1. I-fork ang repo sa GitHub (i-click ang Fork button)
# 2. I-clone ang iyong fork
git clone https://github.com/YOUR-USERNAME/repo.git

# 3. Gumawa ng branch
git checkout -b fix/my-contribution

# 4. Mag-commit at mag-push
git push origin fix/my-contribution

# 5. Mag-open ng PR sa original repo`} />

        <TipBox Icon={Lightbulb} label="Open Source Tip" text="Kahit maliit na contribution ay malaking tulong! Bug fixes, typo corrections, at documentation improvements ay lahat tinatanggap ng open-source projects." />
      </section>

      {/* Sec7 — Fork Sync */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Paano Mag-sync ng Fork</h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Habang tumatagal, mag-iiba-iba ang original repo. Kailangan mong panatilihing updated ang iyong fork para maiwasan ang conflicts.
        </p>
        <CodeBlock code={`# I-add ang original repo bilang upstream
git remote add upstream https://github.com/ORIGINAL-OWNER/repo.git

# I-fetch ang latest changes mula sa upstream
git fetch upstream

# Lumipat sa main branch
git checkout main

# I-merge ang upstream changes
git merge upstream/main

# I-push ang updated main sa iyong fork
git push origin main`} />
        <TipBox Icon={RefreshCw} label="Best Practice" text="Laging i-sync ang iyong fork bago gumawa ng bagong branch. Nakakaiwas ito ng maraming merge conflicts at nagtitiyak na naka-base ang iyong work sa pinakabagong version ng code." />
      </section>

      {/* Sec8 — GitHub Projects */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>GitHub Projects</h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Ang GitHub Projects ay isang built-in project management tool na nagbibigay-daan sa mga team na mag-track ng kanilang trabaho nang direkta sa GitHub.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Bakit Gamitin ang GitHub Projects?</h3>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Sa halip na gumamit ng ibang project management tools (Trello, Jira, Asana), maaari kang mag-organize ng iyong issues at PRs direkta sa GitHub. Lahat ng impormasyon ay nasa iisang lugar.
          </p>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Maaari kang mag-create ng custom fields, mag-filter ng items, at mag-set ng workflows na auto-mabago ang status ng items batay sa actions sa repo.
          </p>
        </div>

        <div className="lesson-cards-row">
          {([
            { Icon: LayoutList, title: 'Board View',   desc: 'Katulad ng Kanban board. Makikita mo ang lahat ng tasks sa columns (To Do, In Progress, Done).' },
            { Icon: BarChart2,  title: 'Table View',   desc: 'Spreadsheet-style na view. Maganda para sa pag-sort at pag-filter ng maraming items nang sabay.' },
            { Icon: Calendar,   title: 'Roadmap View', desc: 'Timeline view na nagpapakita ng mga items sa calendar. Maganda para sa pag-plan ng milestones at releases.' },
          ] as { Icon: React.ElementType; title: string; desc: string }[]).map(v => (
            <div key={v.title} style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <IconBox Icon={v.Icon} />
              <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{v.title}</h3>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sec9 — Best Practices */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Team Collaboration Best Practices</h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Mga pamantayan at gawi na ginagawa ng mga propesyonal na developer para mapanatiling maayos at produktibo ang team collaboration.
        </p>

        {[
          [
            { Icon: GitBranch,     title: 'Laging Mag-branch',     desc: "Isa lang na purpose bawat branch. Huwag mag-mix ng iba't ibang features." },
            { Icon: FileText,      title: 'Malinaw na Commits',    desc: "Gamitin ang conventional commits. Huwag: 'fix stuff'. Dapat: 'fix: resolve login timeout error'." },
            { Icon: RefreshCw,     title: 'Mag-pull Bago Mag-code', desc: 'Laging gawin ang git pull bago magsimulang mag-code para may pinakabagong version ka.' },
            { Icon: Users,         title: 'Small, Focused PRs',    desc: 'Mas madaling i-review ang maliliit na PR. Huwag maglagay ng 50+ files sa isang PR.' },
          ],
          [
            { Icon: MessageSquare, title: 'Communicate',           desc: 'I-update ang team kung may blocker ka. Huwag mag-disappear nang walang paliwanag.' },
            { Icon: CheckCircle2,  title: 'Review Before Merge',   desc: 'Huwag mag-self-merge ng walang review maliban kung solo ka sa project.' },
            { Icon: Trash2,        title: 'Delete Merged Branches', desc: 'Kapag na-merge na, i-delete ang branch. Nakakatulong ito sa cleanliness ng repo.' },
            { Icon: Lock,          title: 'Protect Main Branch',   desc: 'I-set ang branch protection rules para walang makakapag-push direkta sa main.' },
          ],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(row as { Icon: React.ElementType; title: string; desc: string }[]).map(bp => (
              <div key={bp.title} style={{ flex: '1 1 180px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <bp.Icon size={18} style={{ color: 'var(--accent-dim)' }} />
                <h3 style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{bp.title}</h3>
                <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{bp.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Sec10 — Branch Protection */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Branch Protection Rules</h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Ang branch protection rules ay mga settings sa GitHub na nagpoprotekta sa iyong main branch mula sa hindi sinasadyang pagbabago.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Paano I-setup ang Branch Protection</h3>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Sa GitHub: Settings → Branches → Add branch protection rule → Piliin ang main branch
          </p>
          {[
            'Require pull request reviews before merging',
            'Require status checks to pass before merging',
            'Require branches to be up to date before merging',
            'Restrict pushes that create files larger than 100MB',
            'Do not allow bypassing the above settings',
          ].map(rule => (
            <div key={rule} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)' }}>{rule}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sec11 — Real World */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Real World Scenario</h2>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={16} style={{ color: 'var(--accent-dim)' }} />
            Si Pedro at Maria — Magkasamang Nagtatrabaho
          </span>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Si Pedro ay nagtatrabaho sa login feature. Si Maria naman ay nagtatrabaho sa dashboard. Parehong nag-branch sila mula sa main at nagtatrabaho sabay.
          </p>
        </div>

        <CodeBlock code={`# === Si PEDRO ===
git checkout -b feature/login
# ... nag-work si Pedro ...
git add . && git commit -m "feat: add login form"
git push origin feature/login
# Nag-open ng PR → reviewed → merged

# === Si MARIA (sabay na nagtatrabaho) ===
git checkout -b feature/dashboard
# ... nag-work si Maria ...
git add . && git commit -m "feat: build dashboard"
git push origin feature/dashboard
# Nag-open ng PR → reviewed → merged

# Parehong naka-merge nang walang conflict!`} />

        <div style={{ background: 'var(--active-bg)', border: '1px solid var(--accent-dim)', borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
            Walang conflict!
          </span>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Nagawa ng dalawa ang kanilang trabaho nang sabay-sabay. Salamat sa branches, hindi nila nasira ang trabaho ng isa't isa. Ito ang kapangyarihan ng Git collaboration!
          </p>
        </div>
      </section>

      {/* Sec12 — Quick Quiz */}
      <QuizSection />

      {/* Sec13 — Next Steps */}
      <div style={{
        background: 'linear-gradient(180deg, var(--active-bg), var(--bg-primary))',
        border: '1px solid var(--accent-dim)',
        borderRadius: 16, padding: 40,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16,
      }}>
        <Trophy size={48} style={{ color: 'var(--accent-dim)' }} />
        <h3 style={{ ...sans, fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Magaling! Master mo na ang Collaboration!</h3>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', margin: 0, maxWidth: 480 }}>
          Naiintindihan mo na ang Pull Requests, Code Review, Forking, at Team Best Practices. Handa ka na para sa susunod na hamon!
        </p>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0, maxWidth: 440 }}>
          Susunod: Merge Conflicts. Pag-aralan kung paano resolbahin ang mga pagbabagong nagka-conflict sa iyong code.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
          <a
            href="/lessons/github-essentials"
            style={{ padding: '12px 24px', borderRadius: 8, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', ...sans, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
          >
            ← GitHub Essentials
          </a>
          <a
            href="/lessons/merge-conflicts"
            style={{ padding: '12px 24px', borderRadius: 8, background: 'var(--accent-dim)', color: 'var(--text-on-accent)', ...sans, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            Pumunta sa Merge Conflicts →
          </a>
        </div>
      </div>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
