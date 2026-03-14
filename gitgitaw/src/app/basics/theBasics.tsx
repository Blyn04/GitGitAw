import React, { useState } from 'react'
import {
  Camera, RotateCcw, GitBranch, Folder, GitCommit, GitMerge,
  Download, Upload, ArrowDown, Layers, FolderOpen, HardDrive,
  Github, Lightbulb, Check, X, Copy, CheckCircle2,
  ThumbsUp, Trophy, MessageSquare,
} from 'lucide-react'
import Footer from '../../Components/Footer'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

export default function BasicsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, padding: '48px 56px' }}>
      <BreadcrumbSection />
      <HeaderSection />
      <Sec1VersionControl />
      <Sec2Terms />
      <Sec3Workflow />
      <Sec4FirstRepo />
      <Sec5Commands />
      <Sec6Misconceptions />
      <Sec7PushToGitHub />
      <Sec8Quiz />
      <Sec9Next />
      <Footer />
    </div>
  )
}

// ── Reusable ─────────────────────────────────────────────────────────

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '8px 14px' }}>
        <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>{language}</span>
        <button
          onClick={handleCopy}
          style={{
            ...mono, fontSize: 12, cursor: 'pointer', border: 'none', background: 'transparent', padding: 0,
            color: copied ? 'var(--accent)' : 'var(--text-muted)',
            transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div style={{ height: 1, background: 'var(--border)' }} />
      <div style={{ padding: '12px 16px' }}>
        <pre style={{ ...mono, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
      </div>
    </div>
  )
}

function StepCard({ stepNum, title, code, output, tip }: {
  stepNum: string; title: string; code: string; output?: string; tip?: string
}) {
  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ ...mono, fontSize: 11, fontWeight: 600, color: 'var(--accent-dim)' }}>{stepNum}</span>
        <h3 style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
      </div>
      <CodeBlock code={code} />
      {output && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-tip)', border: '1px solid var(--active-border)', borderRadius: 6, padding: '12px 14px' }}>
          <CheckCircle2 size={15} style={{ color: 'var(--accent-dim)', flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)', flex: 1 }}>{output}</span>
        </div>
      )}
      {tip && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Lightbulb size={14} style={{ color: 'var(--accent-dim)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{tip}</p>
        </div>
      )}
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <h2 style={{ ...sans, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h2>
      <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>{subtitle}</p>
    </div>
  )
}

// ── Sections ─────────────────────────────────────────────────────────

function BreadcrumbSection() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 14 }}>
      <span style={{ color: 'var(--accent-dim)' }}>Home</span>
      <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
      <span style={{ color: 'var(--text-muted)' }}>The Basics</span>
    </div>
  )
}

function HeaderSection() {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h1 style={{ ...sans, fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>The Basics</h1>
      <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
        Ang pinaka-importanteng konsepto ng Git. Malinaw at praktikal.
      </p>
    </header>
  )
}

function Sec1VersionControl() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 style={{ ...sans, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
        Ano ang Version Control?
      </h2>

      {/* Big card */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: 32, display: 'flex', gap: 32 }}>
        {/* Left */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ ...sans, fontSize: 18, fontWeight: 700, color: 'var(--text-link)' }}>Isipin mo ito...</span>
          <p style={{ ...sans, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
            {`Isang linggo kang nag-code sa project mo.\nTapos biglang may nasira at hindi mo na maibalik sa dati.\nWala kang backup.\n\nDito pumapasok ang Version Control.\nSi Git ay nagre-record ng bawat pagbabago sa code mo.\nKaya pwede kang bumalik sa kahit anong version anumang oras.`}
          </p>
        </div>
        {/* Right — git log panel */}
        <div style={{ width: 296, flexShrink: 0, background: 'var(--bg-code)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '8px 14px', gap: 8 }}>
            <span style={{ ...mono, fontSize: 9, color: 'var(--text-muted)' }}>● ● ●</span>
            <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>git log --oneline</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 16 }}>
            <span style={{ ...mono, fontSize: 12, color: 'var(--accent)' }}>● 3a7f2c1  Fix: remove bug  ← HEAD</span>
            <span style={{ ...mono, fontSize: 11, color: 'var(--border)' }}>|</span>
            <span style={{ ...mono, fontSize: 12, color: 'var(--text-primary)' }}>● 8b4e5d2  Add login page</span>
            <span style={{ ...mono, fontSize: 11, color: 'var(--border)' }}>|</span>
            <span style={{ ...mono, fontSize: 12, color: 'var(--text-primary)' }}>● 2c9f1a3  Update styles</span>
            <span style={{ ...mono, fontSize: 11, color: 'var(--border)' }}>|</span>
            <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)' }}>● a1b2c3d  Initial commit</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-tip)', borderTop: '1px solid var(--active-border)', padding: '10px 16px' }}>
            <span style={{ ...sans, fontSize: 14, color: 'var(--accent-dim)' }}>↑</span>
            <span style={{ ...sans, fontSize: 11, color: 'var(--accent)' }}>Pwede bumalik sa kahit alin!</span>
          </div>
        </div>
      </div>

      {/* 3 mini concept cards */}
      <div style={{ display: 'flex', gap: 20 }}>
        {([
          { Icon: Camera,    title: 'Snapshot',    desc: 'Bawat commit ay parang litrato ng code mo sa isang specific na oras.' },
          { Icon: RotateCcw, title: 'Time Travel', desc: 'Pwede kang bumalik sa mas lumang version kung may nasira.' },
          { Icon: GitBranch, title: 'Branching',   desc: 'Pwede kang mag-experiment nang hindi naaapektuhan ang main code.' },
        ] as { Icon: React.ElementType; title: string; desc: string }[]).map(c => (
          <div key={c.title} style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <c.Icon size={22} style={{ color: 'var(--accent-dim)' }} />
            <h3 style={{ ...sans, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h3>
            <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const terms: { Icon: React.ElementType; title: string; desc: string; ex: string }[] = [
  { Icon: Folder,    title: 'Repository (Repo)',  desc: 'Ito ang project folder mo kasama ang buong Git history.',             ex: '• ex: gitgitaw-project/' },
  { Icon: GitCommit, title: 'Commit',             desc: 'Isang saved snapshot ng code mo na may kasamang message kung ano ang binago.', ex: '• ex: "Add login page"' },
  { Icon: GitBranch, title: 'Branch',             desc: 'Hiwalay na linya ng development para sa bagong feature o experiment.',  ex: '• ex: feature/login-page' },
  { Icon: GitMerge,  title: 'Merge',              desc: 'Pagsasama ng isang branch papunta sa isa pa.',                         ex: '• ex: merge feature → main' },
  { Icon: Download,  title: 'Clone',              desc: 'Pag-copy ng repository mula GitHub papunta sa computer mo.',            ex: '• ex: git clone [url]' },
  { Icon: Upload,    title: 'Push',               desc: 'Pag-upload ng commits mo papunta sa GitHub.',                          ex: '• ex: git push origin main' },
  { Icon: ArrowDown, title: 'Pull',               desc: 'Pagkuha ng latest changes mula GitHub papunta sa local computer.',      ex: '• ex: git pull origin main' },
  { Icon: Layers,    title: 'Staging Area',       desc: 'Temporary area kung saan pinipili mo kung anong files ang isasama sa commit.', ex: '• ex: git add filename.txt' },
  { Icon: FolderOpen,title: 'Working Directory',  desc: 'Ang kasalukuyang files na ine-edit mo bago mo sila i-add sa staging area.', ex: '• ex: files before git add' },
]

function Sec2Terms() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Mga Importanteng Terms" subtitle="Mga salitang madalas mong makikita sa Git:" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Array.from({ length: Math.ceil(terms.length / 2) }, (_, row) => (
          <div key={row} style={{ display: 'flex', gap: 16 }}>
            {terms.slice(row * 2, row * 2 + 2).map(t => (
              <div key={t.title} style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <t.Icon size={20} style={{ color: 'var(--accent-dim)' }} />
                <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{t.title}</span>
                <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{t.desc}</p>
                <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)', opacity: 0.8 }}>{t.ex}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Sec3Workflow() {
  const stageBox = (icon: React.ReactNode, label: string, sub: string, isGitHub = false) => (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      background: isGitHub ? 'var(--active-bg)' : 'var(--bg-tertiary)',
      border: isGitHub ? '2px solid var(--active-border)' : '1px solid var(--border)',
      borderRadius: 8, padding: 14,
    }}>
      {icon}
      <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{label}</span>
      <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>{sub}</span>
    </div>
  )

  const arrow = (cmd: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0, padding: '0 4px' }}>
      <span style={{ ...mono, fontSize: 11, color: 'var(--accent-dim)' }}>{cmd}</span>
      <span style={{ ...sans, fontSize: 20, color: 'var(--accent-dim)' }}>➡</span>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Ang Git Workflow" subtitle="Ganito ang typical flow kapag gumagamit ka ng Git:" />
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Flow row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {stageBox(<FolderOpen size={18} style={{ color: 'var(--text-muted)' }} />, 'Working Dir', 'local files')}
          {arrow('git add')}
          {stageBox(<Layers size={18} style={{ color: 'var(--text-muted)' }} />, 'Staging Area', 'git add')}
          {arrow('git commit')}
          {stageBox(<HardDrive size={18} style={{ color: 'var(--text-muted)' }} />, 'Local Repo', '.git folder')}
          {arrow('git push')}
          {stageBox(<Github size={18} style={{ color: 'var(--accent-dim)' }} />, 'GitHub', 'remote', true)}
        </div>
        {/* Pull row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ ...mono, fontSize: 12, color: 'var(--text-link)' }}>← git pull</span>
          <span style={{ ...sans, fontSize: 12, color: 'var(--text-muted)' }}>(para makuha ang bagong changes mula GitHub)</span>
        </div>
        {/* Tip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-tip)', border: '1px solid var(--active-border)', borderRadius: 8, padding: '14px 16px' }}>
          <Lightbulb size={16} style={{ color: 'var(--accent-dim)', flexShrink: 0 }} />
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-primary)', margin: 0, flex: 1 }}>
            Ang cycle: Mag-edit, i-add, i-commit, i-push. Ulitin.
          </p>
        </div>
      </div>
    </div>
  )
}

function Sec4FirstRepo() {
  const [tab, setTab] = useState<'new' | 'existing'>('new')

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    cursor: 'pointer',
    background: active ? 'var(--bg-secondary)' : 'var(--bg-primary)',
    borderBottom: active ? '2px solid var(--active-border)' : '1px solid var(--border)',
    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
    ...sans, fontSize: 14, fontWeight: active ? 700 : 400,
    userSelect: 'none',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Ang Iyong Unang Repository" subtitle="Subukan natin ito step by step:" />

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        <div style={tabStyle(tab === 'new')} onClick={() => setTab('new')}>Bagong Project</div>
        <div style={tabStyle(tab === 'existing')} onClick={() => setTab('existing')}>Existing Project</div>
      </div>

      {/* Bagong Project */}
      {tab === 'new' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <StepCard stepNum="Step 1" title="Gumawa ng folder"
            code={`mkdir my-first-project\ncd my-first-project`} />
          <StepCard stepNum="Step 2" title="I-initialize ang Git"
            code="git init"
            output="Initialized empty Git repository in .git/"
            tip="Ang .git folder ang naglalaman ng buong history ng project mo." />
          <StepCard stepNum="Step 3" title="Gumawa ng file"
            code={`echo "# My First Project" > README.md`}
            tip="Magandang practice ang may README ang bawat project." />
          <StepCard stepNum="Step 4" title="I-check ang status"
            code="git status"
            tip="Makikita mo ang README.md sa ilalim ng 'Untracked files'." />
          <StepCard stepNum="Step 5" title="I-add sa Staging Area"
            code={`git add README.md\n# O lahat ng files:\ngit add .`}
            tip="Ang tuldok (.) ay nangangahulugang lahat ng files sa folder." />
          <StepCard stepNum="Step 6" title="Unang Commit"
            code={`git commit -m "Initial commit: Add README"`}
            output="Recorded na ang unang snapshot ng project mo." />
        </div>
      )}

      {/* Existing Project */}
      {tab === 'existing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 20, borderTop: '2px solid var(--border)' }}>
          <StepCard stepNum="Step 1" title="I-clone ang Repository"
            code="git clone https://github.com/username/repo.git"
            tip="Palitan ang URL ng actual na GitHub repository link." />
          <StepCard stepNum="Step 2" title="Pumasok sa project folder"
            code="cd repo-name" />
          <StepCard stepNum="Step 3" title="I-check ang status at gumawa ng branch"
            code={`git status\ngit checkout -b feature/my-changes`}
            tip="Palaging gumawa ng bagong branch bago mag-edit. Huwag direkta sa main." />
          <StepCard stepNum="Step 4" title="I-add, I-commit, at I-push"
            code={`git add .\ngit commit -m "Add my changes"\ngit push origin feature/my-changes`}
            output="Naka-push na ang changes mo! Handa na para sa Pull Request." />
        </div>
      )}
    </div>
  )
}

const commands = [
  { cmd: 'git init',          desc: 'Mag-start ng bagong Git repository sa kasalukuyang folder' },
  { cmd: 'git status',        desc: 'Tingnan ang status ng mga files (staged, unstaged, untracked)' },
  { cmd: 'git add .',         desc: 'I-add ang lahat ng files sa staging area para sa commit' },
  { cmd: 'git commit -m',     desc: 'I-save ang changes na may kasamang message' },
  { cmd: 'git push',          desc: 'I-upload ang commits papunta sa GitHub' },
  { cmd: 'git pull',          desc: 'Kunin ang pinakabagong changes mula GitHub' },
  { cmd: 'git log',           desc: 'Tingnan ang buong history ng commits' },
  { cmd: 'git branch',        desc: 'Tingnan ang list ng lahat ng branches' },
  { cmd: 'git checkout -b',   desc: 'Gumawa at lumipat agad sa bagong branch' },
]

function Sec5Commands() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Mga Basic Commands" subtitle="Mga commands na madalas mong gagamitin:" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {commands.map(c => (
          <div key={c.cmd} style={{ display: 'flex', alignItems: 'center', gap: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 20px' }}>
            <code style={{ ...mono, fontSize: 13, color: 'var(--text-link)', whiteSpace: 'nowrap' }}>{c.cmd}</code>
            <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', flex: 1 }}>{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const misconceptions = [
  { myth: '"Dapat perfect ang commit message ko"',           truth: 'Hindi kailangang perfect. Basta malinaw at descriptive.' },
  { myth: '"Commit lang kapag tapos na ang feature"',         truth: 'Mas mabuti ang madalas na commit kahit maliit ang changes.' },
  { myth: '"Mabubura ang code ko kapag nag-branch ako"',      truth: 'Hindi. Ligtas ang main branch mo maliban kung i-merge mo.' },
  { myth: '"Kailangan ko munang maging expert bago mag-push"', truth: 'Hindi. Mas mabuting may backup kaysa wala.' },
]

function Sec6Misconceptions() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Mga Maling Akala ng Beginners" subtitle="Klaruhin natin ang mga common misconceptions:" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {misconceptions.map((m, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px' }}>
              <X size={15} style={{ color: '#f85149', flexShrink: 0 }} />
              <p style={{ ...sans, fontSize: 14, color: '#f85149', margin: 0, flex: 1 }}>{m.myth}</p>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px', background: 'var(--bg-primary)' }}>
              <Check size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <p style={{ ...sans, fontSize: 14, color: 'var(--accent)', margin: 0 }}>{m.truth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Sec7PushToGitHub() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="I-push sa GitHub" subtitle="Kapag may GitHub account ka na at naka-connect ang Git:" />
      <CodeBlock code={`# I-connect ang local repo sa GitHub\ngit remote add origin https://github.com/username/repo.git\n\n# I-push ang unang beses\ngit push -u origin main`} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-tip)', border: '1px solid var(--active-border)', borderRadius: 8, padding: '14px 16px' }}>
        <Lightbulb size={16} style={{ color: 'var(--accent-dim)', flexShrink: 0 }} />
        <p style={{ ...sans, fontSize: 13, color: 'var(--text-primary)', margin: 0, flex: 1 }}>
          Ang <code style={mono}>-u</code> flag ay nagse-set ng default upstream. Sa susunod, <code style={mono}>git push</code> na lang ang kailangan.
        </p>
      </div>
    </div>
  )
}

const quizItems = [
  {
    q: 'Anong command ang ginagamit para i-save ang changes na may message?',
    options: ['git push', 'git commit -m "message"', 'git add .'],
    correct: 1,
    explanation: 'Ang git commit -m ay nagse-save ng staged changes bilang isang snapshot na may descriptive message.',
  },
  {
    q: 'Ano ang tinatawag sa temporary area bago mag-commit?',
    options: ['Working Directory', 'Staging Area', 'Remote Repo'],
    correct: 1,
    explanation: 'Ang Staging Area (index) ang lugar kung saan mo pinipili ang mga files bago mo i-commit.',
  },
  {
    q: 'Anong command ang gagamitin para i-copy ang repo mula GitHub?',
    options: ['git clone [url]', 'git pull', 'git init'],
    correct: 0,
    explanation: 'Ang git clone ay nagdo-download ng buong repository kasama ang lahat ng history nito.',
  },
]

function Sec8Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null])
  const [submitted, setSubmitted] = useState(false)

  const answered = answers.every(a => a !== null)
  const score = answers.filter((a, i) => a === quizItems[i].correct).length

  function pick(qi: number, oi: number) {
    if (submitted) return
    setAnswers(prev => prev.map((a, i) => (i === qi ? oi : a)))
  }

  function reset() {
    setAnswers([null, null, null])
    setSubmitted(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Quick Quiz" subtitle="Subukan ang iyong natutunan:" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {quizItems.map((item, qi) => {
          const selected = answers[qi]
          const isAnswered = submitted && selected !== null

          return (
            <div
              key={qi}
              style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14,
              }}
            >
              {/* Question */}
              <p style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                <span style={{ ...mono, fontSize: 11, color: 'var(--accent-dim)', marginRight: 10 }}>
                  Q{qi + 1}
                </span>
                {item.q}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {item.options.map((opt, oi) => {
                  const isSelected = selected === oi
                  const isCorrect = oi === item.correct
                  let bg = 'transparent'
                  let border = '1px solid var(--border)'
                  let color = 'var(--text-muted)'

                  if (isSelected && !submitted) {
                    bg = 'var(--bg-tertiary)'
                    border = '1px solid var(--text-muted)'
                    color = 'var(--text-primary)'
                  } else if (isAnswered && isCorrect) {
                    bg = 'var(--bg-tip)'
                    border = '1px solid var(--active-border)'
                    color = 'var(--accent)'
                  } else if (isAnswered && isSelected && !isCorrect) {
                    bg = 'rgba(248,81,73,0.08)'
                    border = '1px solid #f85149'
                    color = '#f85149'
                  }

                  return (
                    <div
                      key={oi}
                      onClick={() => pick(qi, oi)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 14px', borderRadius: 8,
                        background: bg, border,
                        cursor: submitted ? 'default' : 'pointer',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                    >
                      {/* Letter badge */}
                      <span style={{
                        ...mono, fontSize: 11, fontWeight: 600,
                        width: 20, height: 20, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: 4, border,
                        color,
                      }}>
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span style={{ ...mono, fontSize: 13, color }}>{opt}</span>
                      {/* Icon after submit */}
                      {isAnswered && isCorrect && <Check size={14} style={{ marginLeft: 'auto', color: 'var(--accent)', flexShrink: 0 }} />}
                      {isAnswered && isSelected && !isCorrect && <X size={14} style={{ marginLeft: 'auto', color: '#f85149', flexShrink: 0 }} />}
                    </div>
                  )
                })}
              </div>

              {/* Explanation after submit */}
              {isAnswered && (
                <div style={{
                  display: 'flex', gap: 8, alignItems: 'flex-start',
                  background: 'var(--bg-tertiary)', borderRadius: 6, padding: '10px 14px',
                }}>
                  <MessageSquare size={13} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 1 }} />
                  <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit / Score / Reset */}
      {!submitted ? (
        <button
          onClick={() => answered && setSubmitted(true)}
          disabled={!answered}
          style={{
            alignSelf: 'flex-start', padding: '10px 24px', borderRadius: 8, border: 'none',
            background: answered ? 'var(--accent-dim)' : 'var(--bg-tertiary)',
            color: answered ? 'var(--text-on-accent)' : 'var(--text-muted)',
            ...sans, fontSize: 14, fontWeight: 600,
            cursor: answered ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s',
          }}
        >
          Ipasa ang Quiz
        </button>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: score === quizItems.length ? 'var(--bg-tip)' : 'var(--bg-tertiary)',
          border: `1px solid ${score === quizItems.length ? 'var(--active-border)' : 'var(--border)'}`,
          borderRadius: 10, padding: '16px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {score === quizItems.length
              ? <Trophy size={18} style={{ color: 'var(--accent)' }} />
              : score >= 2
              ? <ThumbsUp size={18} style={{ color: 'var(--accent)' }} />
              : <RotateCcw size={16} style={{ color: 'var(--text-muted)' }} />}
            <span style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
              {score === quizItems.length ? 'Perfect Score!' : score >= 2 ? 'Magaling!' : 'Subukan ulit!'}
            </span>
            <span style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', marginLeft: 10 }}>
              {score}/{quizItems.length} tamang sagot
            </span>
          </div>
          <button
            onClick={reset}
            style={{
              padding: '8px 18px', borderRadius: 8, border: '1px solid var(--border)',
              background: 'transparent', color: 'var(--text-muted)',
              ...sans, fontSize: 13, cursor: 'pointer',
            }}
          >
            Ulit
          </button>
        </div>
      )}
    </div>
  )
}

function Sec9Next() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 style={{ ...sans, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Ano ang Susunod?</h2>
      <div style={{
        background: 'linear-gradient(180deg, var(--active-bg), var(--bg-primary))',
        border: '1px solid var(--active-border)',
        borderRadius: 16, padding: 40,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16,
      }}>
        <Trophy size={48} style={{ color: 'var(--accent-dim)' }} />
        <h3 style={{ ...sans, fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Magaling!</h3>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
          Naiintindihan mo na ang basics ng Git.
        </p>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Next: Branching at Merging — dito mas lalalim ang paggamit mo ng Git.
        </p>
        <a
          href="/lessons/branching-merging"
          style={{
            marginTop: 4, padding: '12px 24px', borderRadius: 8,
            background: 'var(--accent-dim)', color: 'var(--text-on-accent)',
            ...sans, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Pumunta sa Branching &amp; Merging →
        </a>
      </div>
    </div>
  )
}
