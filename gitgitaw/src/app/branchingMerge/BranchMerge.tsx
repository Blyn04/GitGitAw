import React, { useState } from 'react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

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
          style={{
            ...mono, fontSize: 12, cursor: 'pointer', border: 'none', background: 'transparent', padding: 0,
            color: copied ? 'var(--accent)' : 'var(--text-muted)',
          }}
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

export default function BranchMerge() {
  const { showBackToTop, scrollToTop } = useBackToTop()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, padding: '48px 56px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: 'var(--accent-dim)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>Branching & Merging</span>
      </div>

      {/* Page header */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h1 style={{ ...sans, fontSize: 40, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Branching & Merging
        </h1>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Mag-experiment nang walang takot — yan ang advantage ng branches.
        </p>
      </header>

      {/* Sec1 Ano ang Branch */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Ano ang Branch?
        </h2>

        <div style={{ background: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-dim)', borderRadius: 12, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          <span style={{ fontSize: 40 }}></span>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <h3 style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Ang Branch = Hiwalay na Kopya ng Code
            </h3>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              Isipin ang pagluluto ng bagong recipe. Hindi mo sinisira ang original, gumawa ka ng hiwalay na lalagyan para mag-experiment. Ganito rin ang branch sa Git. Pwede kang mag-try ng bagong feature o mag-fix ng bug nang hindi sinisira ang main code.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { icon: '', name: 'main', desc: 'Production-ready code. Palaging gumagana at stable. Dito nagsisimula ang lahat ng commits.', badge: '● production', borderColor: 'var(--accent-dim)' },
            { icon: '', name: 'feature/*', desc: 'Hiwalay na branch para sa bagong features. Safe mag-experiment dito nang hindi naaapektuhan ang main.', badge: '● development', borderColor: '#388bfd' },
            { icon: '', name: 'bugfix/*', desc: 'Branch para sa pag-aayos ng bugs. I-merge pabalik sa main kapag tapos na ang fix.', badge: '● fixing', borderColor: '#f85149' },
            { icon: '', name: 'hotfix/*', desc: 'Emergency fixes para sa production bugs. Direkta mula sa main branch, mabilis na solusyon.', badge: '● urgent', borderColor: '#d29922' },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                flex: '1 1 200px',
                background: 'var(--bg-secondary)',
                borderTop: `3px solid ${c.borderColor}`,
                borderRadius: 12,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>{c.icon}</span>
              <span style={{ ...mono, fontSize: 15, fontWeight: 700, color: c.borderColor }}>{c.name}</span>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
              <div style={{ background: 'var(--active-bg)', borderRadius: 20, padding: '4px 10px', alignSelf: 'flex-start' }}>
                <span style={{ ...mono, fontSize: 11, color: c.borderColor }}>{c.badge}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--active-bg)', border: '1px solid var(--accent-dim)', borderRadius: 8, padding: '14px 16px' }}>
          <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            💡 Ang main branch ay patuloy na nag-iipon ng commits. Ang feature branch ay nagsisimula sa isang commit point, may sariling history, at maaaring bumalik sa main.
          </p>
        </div>
      </section>

      {/* Sec2 Visual Branch */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '32px 40px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12 }}>
        <h2 style={{ ...mono, fontSize: 22, fontWeight: 600, color: 'var(--accent)', margin: 0, textAlign: 'center' }}>
          Visual Branch
        </h2>
        <p style={{ ...mono, fontSize: 13, color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>
          Ganito ang structure ng branching sa git
        </p>
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 4, padding: 24, minHeight: 210 }}>
          <svg width="100%" height="180" viewBox="0 0 400 180" style={{ overflow: 'visible' }}>
            {/* main branch — green horizontal line with commits */}
            <path d="M 40 90 H 120 H 200 H 280 H 360" stroke="var(--accent)" strokeWidth="2" fill="none" />
            {/* feature branch — light blue: diverge at commit 1, two commits, merge back to main */}
            <path d="M 120 90 L 120 150 H 200 H 280 L 280 90" stroke="#79c0ff" strokeWidth="2" fill="none" />
            {/* main commit circles (green) */}
            <circle cx="40" cy="90" r="11" fill="var(--accent)" />
            <circle cx="120" cy="90" r="11" fill="var(--accent)" />
            <circle cx="200" cy="90" r="11" fill="var(--accent)" />
            <circle cx="280" cy="90" r="11" fill="var(--accent)" />
            <circle cx="360" cy="90" r="11" fill="var(--accent)" />
            {/* feature commit circles (light blue) */}
            <circle cx="200" cy="150" r="11" fill="#79c0ff" />
            <circle cx="280" cy="150" r="11" fill="#79c0ff" />
            {/* labels */}
            <text x="20" y="85" fill="var(--accent)" style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700 }}>main</text>
            <text x="105" y="75" fill="var(--accent)" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>1</text>
            <text x="268" y="72" fill="#ffa657" style={{ fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600 }}>MERGE</text>
            <text x="272" y="88" fill="#ffa657" style={{ fontFamily: 'JetBrains Mono', fontSize: 10 }}>HEAD</text>
            <text x="200" y="168" fill="#79c0ff" style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700 }}>feature</text>
          </svg>
        </div>
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--accent)', borderRadius: 4, padding: '14px 16px' }}>
          <p style={{ ...mono, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            ang main branch ay patuloy na nag-iipon ng commits. ang feature branch ay nagsisimula sa isang commit point, may sariling history, at maaaring bumalik sa main.
          </p>
        </div>
      </section>

      {/* Sec3 Basic Branch Commands */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Basic Branch Commands
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Mga pangunahing commands na kailangan mong malakan:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ ...sans, fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>Branch listing</h3>
          <CodeBlock code={`git branch\ngit branch -a`} />
          <div style={{ background: 'var(--active-bg)', borderRadius: 8, padding: '14px 16px' }}>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Ang branch na may * ay ang active branch mo.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ ...sans, fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>Create branch</h3>
          <CodeBlock code="git switch -c feature/add-login" />
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Supporting commands (for learning context only):</p>
          <CodeBlock code={`git branch feature/add-login\ngit checkout -b feature/add-login`} />
          <div style={{ background: 'var(--active-bg)', border: '1px solid var(--accent-dim)', borderRadius: 8, padding: '14px 16px' }}>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Mas recommended ang descriptive branch names.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ ...sans, fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>Switch branch warning</h3>
          <div style={{ background: 'var(--active-bg)', border: '1px solid #f0ad4e', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Siguraduhing naka-commit o naka-stash ang changes bago lumipat ng branch.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ ...sans, fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>Delete branch</h3>
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            OK lang mag-delete ng branch pagkatapos ng merge dahil naka-save pa rin ang commit history sa Git.
          </p>
        </div>
      </section>

      {/* Sec4 Branch Naming Convention */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Branch Naming Convention
        </h2>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', background: 'var(--active-bg)', border: '2px solid var(--accent-dim)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ ...sans, fontSize: 18, color: 'var(--accent-dim)' }}>DO</span>
            <pre style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{`•  Use descriptive names
•  Follow type/description format
•  Use lowercase letters
•  Use hyphens for spaces
•  Keep names concise but clear`}</pre>
          </div>
          <div style={{ flex: '1 1 280px', background: 'var(--active-bg)', border: '2px solid #d29922', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ ...sans, fontSize: 18, color: '#d29922' }}>DON'T</span>
            <pre style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{`•  Use generic names (test, temp, new)
•  Use uppercase letters
•  Use spaces in names
•  Use special characters (!@#$%)
•  Make names too long`}</pre>
          </div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent-dim)', borderRadius: 8, padding: '14px 16px' }}>
          <span style={{ ...sans, fontSize: 14, color: 'var(--accent-dim)' }}>Format recommended: type/description</span>
        </div>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-primary)', margin: 0 }}>Examples:</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['feature/user-auth', 'bugfix/login-error', 'hotfix/security-patch', 'chore/dependency-update'].map((ex) => (
            <div key={ex} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px' }}>
              <span style={{ ...mono, fontSize: 12, color: 'var(--accent)' }}>{ex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sec5 Merging */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Merging
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Ang merge ay ang pagsasama ng changes mula sa isang branch papunta sa isa pa. Kadalasan, ginagawa ito kapag tapos na ang feature development.
        </p>
        <h3 style={{ ...sans, fontSize: 20, fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>Merge Workflow Steps</h3>

        {[
          { title: 'Step 1 — Update feature branch', code: 'git switch feature/add-login\ngit pull origin main', tip: 'Mas mabuting i-sync muna ang main branch para maiwasan ang malalaking conflicts.' },
          { title: 'Step 2 — Switch to main', code: 'git switch main' },
          { title: 'Step 3 — Merge', code: 'git merge feature/add-login', output: "Merge made by the 'ort' strategy." },
          { title: 'Step 4 — Push update', code: 'git push origin main' },
          { title: 'Step 5 — Optional cleanup', code: 'git branch -d feature/add-login\ngit push origin --delete feature/add-login' },
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h4 style={{ ...sans, fontSize: 16, fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>{step.title}</h4>
            <CodeBlock code={step.code} />
            {step.tip && (
              <div style={{ background: 'var(--active-bg)', borderRadius: 8, padding: '14px 16px' }}>
                <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{step.tip}</p>
              </div>
            )}
            {step.output && (
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent-dim)', borderRadius: 8, padding: '16px 20px' }}>
                <span style={{ ...mono, fontSize: 13, color: 'var(--accent)', fontStyle: 'italic' }}>{step.output}</span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Sec6 Merge Conflicts */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Merge Conflicts
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          When two branches modify the same part of a file, Git cannot decide which version to keep.
        </p>
        <div style={{ background: 'var(--bg-secondary)', border: '2px solid #d29922', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ ...mono, fontSize: 13, color: '#d29922' }}>{'<<<<<<< HEAD'}</span>
          <span style={{ ...mono, fontSize: 13, color: 'var(--text-primary)' }}>Content from current branch</span>
          <span style={{ ...mono, fontSize: 13, color: '#d29922' }}>=======</span>
          <span style={{ ...mono, fontSize: 13, color: 'var(--text-primary)' }}>Content from feature branch</span>
          <span style={{ ...mono, fontSize: 13, color: '#d29922' }}>{'>>>>>>> feature/add-login'}</span>
        </div>
        <div style={{ background: 'var(--active-bg)', borderRadius: 8, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...sans, fontSize: 14, color: '#d29922' }}>🔴 HEAD: Changes from current branch</span>
          <span style={{ ...sans, fontSize: 14, color: '#f0ad4e' }}>🟡 Feature: Changes from incoming branch</span>
        </div>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-primary)', margin: 0 }}>How to resolve:</p>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          Piliin kung aling content ang gusto mong i-keep, tanggalin ang conflict markers ({'<<<<<<<'}, {'======='}, {'>>>>>>>'}), tapos i-add at i-commit ang file.
        </p>
      </section>

      {/* Next CTA */}
      <div style={{ background: 'linear-gradient(180deg, var(--active-bg), var(--bg-primary))', border: '1px solid var(--accent-dim)', borderRadius: 16, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
        <h3 style={{ ...sans, fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Magaling!</h3>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
          Naiintindihan mo na ang branching at merging.
        </p>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Next: GitHub Essentials — matutunan mo ang collaboration workflow.
        </p>
        <a
          href="/lessons/github-essentials"
          style={{
            marginTop: 4, padding: '12px 24px', borderRadius: 8,
            background: 'var(--accent-dim)', color: 'var(--text-on-accent)',
            ...sans, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Pumunta sa GitHub Essentials →
        </a>
      </div>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
