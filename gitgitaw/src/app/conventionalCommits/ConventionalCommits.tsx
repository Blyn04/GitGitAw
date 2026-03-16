import React, { useState } from 'react'
import {
  BookOpen, Bot, Users, Briefcase,
  Tag, Braces, AlignLeft, AlignJustify, StickyNote,
  Sparkles, Bug, Paintbrush, RefreshCw, FlaskConical,
  Wrench, Zap, Hammer, GitPullRequest, Undo2,
  Info, AlertTriangle, Lightbulb, CheckCircle2, XCircle,
  Trophy,
} from 'lucide-react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

// ── Shared helpers ─────────────────────────────────────────────────────────

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
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
        <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>
          {filename ?? 'bash'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          style={{ ...mono, fontSize: 12, cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, color: copied ? 'var(--accent)' : 'var(--text-muted)' }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div style={{ height: 1, background: 'var(--border)' }} />
      <div style={{ padding: '14px 16px' }}>
        <pre style={{ ...mono, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{code}</pre>
      </div>
    </div>
  )
}

function CalloutBox({
  Icon, label, children, variant = 'green',
}: {
  Icon: React.ElementType
  label: string
  children: React.ReactNode
  variant?: 'green' | 'yellow' | 'red' | 'blue'
}) {
  const styles = {
    green: { bg: 'var(--active-bg)',    border: 'var(--accent-dim)',  color: 'var(--accent)' },
    yellow:{ bg: 'rgba(227,179,65,.08)', border: '#e3b341',            color: '#e3b341' },
    red:   { bg: 'rgba(248,81,73,.08)', border: '#f85149',            color: '#f85149' },
    blue:  { bg: 'rgba(31,111,235,.08)', border: '#1f6feb',           color: '#79c0ff' },
  }
  const s = styles[variant]
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: s.color, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={14} /> {label}
      </span>
      <div style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  )
}

// ── Type card ──────────────────────────────────────────────────────────────

function TypeCard({
  Icon, label, accent, when, example,
}: {
  Icon: React.ElementType
  label: string
  accent: string
  when: string
  example: string
}) {
  return (
    <div style={{
      background: 'var(--bg-secondary)', borderRadius: 8,
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8,
      borderLeft: `3px solid ${accent}`,
    }}>
      <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: accent, display: 'flex', alignItems: 'center', gap: 7 }}>
        <Icon size={14} strokeWidth={2} /> {label}
      </span>
      <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{when}</p>
      <code style={{ ...mono, fontSize: 12, color: 'var(--text-link)', lineHeight: 1.6 }}>{example}</code>
    </div>
  )
}

// ── Anatomy item ───────────────────────────────────────────────────────────

function AnatItem({
  Icon, accent, label, required, children,
}: {
  Icon: React.ElementType
  accent: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div style={{
      background: 'var(--bg-secondary)', borderRadius: 8,
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6,
      borderLeft: `3px solid ${accent}`,
    }}>
      <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: accent, display: 'flex', alignItems: 'center', gap: 7 }}>
        <Icon size={14} strokeWidth={2} />
        {label}
        {required != null && (
          <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: required ? accent : 'var(--text-muted)', marginLeft: 4 }}>
            {required ? 'REQUIRED' : 'OPTIONAL'}
          </span>
        )}
      </span>
      <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{children}</p>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ConventionalCommits() {
  const { showBackToTop, scrollToTop } = useBackToTop()

  return (
    <div className="lesson-page">

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: 'var(--accent-dim)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>Conventional Commits</span>
      </div>

      {/* Page Header */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h1 className="lesson-page-title" style={{ ...sans, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Conventional Commits
        </h1>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Ang secret ng mga professional developers — malinaw, consistent, at madaling basahin na commit messages!
        </p>
      </header>

      {/* ── Sec 1 — Bakit Mahalaga ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Bakit Mahalaga ang Commit Messages?
        </h2>

        {/* Story callout */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: 'var(--text-warning)', display: 'flex', alignItems: 'center', gap: 7 }}>
            <BookOpen size={14} /> Kwento muna tayo...
          </span>
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            Isipin mo na bumalik ka sa project mo pagkatapos ng 6 na buwan. Binuksan mo ang{' '}
            <code style={{ ...mono, fontSize: 13, color: 'var(--text-link)' }}>git log</code> at ito ang nakita mo:
          </p>
          <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px' }}>
            <pre style={{ ...mono, fontSize: 13, color: '#f85149', lineHeight: 1.9, margin: 0 }}>
              {`fixed stuff\nWIP\nasdfgh\nchanges\npls work na\nfinal\nFINAL FINAL\nFINAL FINAL TALAGA NA`}
            </pre>
          </div>
          <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            Alam mo ba kung ano ang nangyari sa bawat commit? Hindi.<br /><br />
            At yan ang problema. Dito pumapasok ang Conventional Commits — isang standard na format para sa
            commit messages na nagbibigay ng malinaw na context sa kahit sino, kahit kailan — kahit ikaw mismo sa future.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="lesson-cards-row">
          {([
            { Icon: BookOpen,  title: 'Readable History',   desc: 'Mas madaling maintindihan kung ano ang nangyari sa project kahit hindi mo pa binabasa ang code.',                      accent: '#1f6feb' },
            { Icon: Bot,       title: 'Automation Ready',   desc: 'Pwedeng awtomatikong mag-generate ng CHANGELOG at version bumps gamit ang iba\'t ibang tools.',                        accent: 'var(--text-warning)' },
            { Icon: Users,     title: 'Team Standard',      desc: 'Lahat ng team members ay gumagamit ng parehong format — mas kaunti ang confusion.',                                     accent: 'var(--accent)' },
            { Icon: Briefcase, title: 'Professional Look',  desc: 'Ang maayos na commit history ay nagpapakita ng professionalism sa GitHub.',                                             accent: '#a371f7' },
          ] as const).map(b => (
            <div key={b.title} style={{
              flex: 1, background: 'var(--bg-secondary)', borderRadius: 10,
              padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 10,
              borderTop: `2px solid ${b.accent}`,
            }}>
              <b.Icon size={20} style={{ color: b.accent }} strokeWidth={1.75} />
              <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{b.title}</span>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sec 2 — Ang Format ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Ang Format</h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Ito ang official format ng Conventional Commits:
        </p>

        {/* Format card */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'var(--bg-tertiary)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...mono, fontSize: 10, color: 'var(--border)' }}>● ● ●</span>
            <span style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>commit-format.txt</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <code style={{ ...mono, fontSize: 15, fontWeight: 700, color: 'var(--text-link)' }}>
              {'<type>(<scope>): <description>'}
            </code>
            <pre style={{ ...mono, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
              {'\n[optional body]\n\n[optional footer(s)]'}
            </pre>
          </div>
        </div>

        <h3 style={{ ...sans, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Anatomy Breakdown
        </h3>

        <AnatItem Icon={Tag}          accent="#f85149"  label="type"        required={true}>
          Ang kategorya ng iyong change. Lowercase letters lang.{' '}
          Examples: <code style={mono}>feat, fix, docs, chore</code>
        </AnatItem>
        <AnatItem Icon={Braces}       accent="var(--text-warning)" label="scope" required={false}>
          Ang bahagi ng codebase na naapektuhan. Nakalagay sa loob ng parentheses.{' '}
          Examples: <code style={mono}>(auth), (api), (ui), (database)</code>
        </AnatItem>
        <AnatItem Icon={AlignLeft}    accent="var(--accent)"  label="description" required={true}>
          Maikling paliwanag ng ginawa mo. Lowercase ang unang letra. Walang period sa dulo.
          Present tense: <code style={mono}>add</code>, hindi <code style={mono}>added</code>. Maximum 72 characters.
        </AnatItem>
        <AnatItem Icon={AlignJustify} accent="#1f6feb"  label="body"        required={false}>
          Mas detalyadong explanation. I-explain kung <strong>BAKIT</strong> ginawa ang change, hindi kung paano.
          Dapat may blank line bago ang body.
        </AnatItem>
        <AnatItem Icon={StickyNote}   accent="#a371f7"  label="footer"      required={false}>
          Para sa issue references o breaking changes.{' '}
          Examples: <code style={mono}>Closes #123</code>  |  <code style={mono}>BREAKING CHANGE: renamed API</code>
        </AnatItem>
      </section>

      {/* ── Sec 3 — Ang Mga Types ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Ang Mga Types</h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Ito ang mga official commit types at kung kailan sila ginagamit:
        </p>

        <TypeCard Icon={Sparkles}      label="feat"     accent="var(--accent)"
          when="Bagong feature o functionality. Kapag nagdagdag ka ng bagong feature na makikita ng users."
          example="feat(auth): add Google OAuth login" />
        <TypeCard Icon={Bug}           label="fix"      accent="#f85149"
          when="Pag-aayos ng bug. Kapag may inayos kang sirang functionality."
          example="fix(login): resolve incorrect password validation error" />
        <TypeCard Icon={BookOpen}      label="docs"     accent="var(--text-link)"
          when="Documentation changes lamang. Nag-update ka ng README, comments, o documentation files."
          example="docs(readme): add installation instructions for Windows" />
        <TypeCard Icon={Paintbrush}    label="style"    accent="#a371f7"
          when="Formatting lang — walang logic change. Indentation, whitespace, semicolons, formatting."
          example="style(components): fix inconsistent indentation" />
        <TypeCard Icon={RefreshCw}     label="refactor" accent="var(--text-warning)"
          when="Code restructuring — inayos ang structure ng code, walang bagong feature, walang bug fix."
          example="refactor(auth): simplify token validation logic" />
        <TypeCard Icon={FlaskConical}  label="test"     accent="#58a6ff"
          when="Tests related changes. Nag-add o nag-update ng tests."
          example="test(auth): add unit tests for login validation" />
        <TypeCard Icon={Wrench}        label="chore"    accent="#e76e50"
          when="Maintenance tasks. Pag-update ng dependencies, configs, etc."
          example="chore(deps): update axios from 1.4.0 to 1.6.0" />
        <TypeCard Icon={Zap}           label="perf"     accent="var(--accent)"
          when="Performance improvements. Pag-optimize ng code para maging mas mabilis."
          example="perf(api): optimize database query for user list" />
        <TypeCard Icon={Hammer}        label="build"    accent="var(--text-warning)"
          when="Build system changes. Pag-update ng webpack, bundler configs, etc."
          example="build(webpack): update production bundle configuration" />
        <TypeCard Icon={GitPullRequest} label="ci"      accent="#58a6ff"
          when="CI/CD changes. Pag-update ng GitHub Actions, pipelines, etc."
          example="ci(github): add automated testing on pull requests" />
        <TypeCard Icon={Undo2}         label="revert"   accent="#f85149"
          when="Nag-revert ng previous commit. Kapag kailangang i-undo ang isang change."
          example="revert: revert feat(auth): add Google OAuth login" />
      </section>

      {/* ── Sec 5 — Writing Good Descriptions ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Writing Good Descriptions
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Paano magsulat ng magandang commit description:
        </p>

        {/* DO / DON'T cards */}
        <div className="lesson-cards-row">
          <div style={{ flex: 1, background: 'var(--active-bg)', border: '1px solid var(--active-border)', borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 7 }}>
              <CheckCircle2 size={15} /> DO
            </span>
            <ul style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>Gumamit ng present tense — <code style={mono}>add</code> hindi <code style={mono}>added</code></li>
              <li>Lowercase ang unang letra</li>
              <li>Huwag lagyan ng period sa dulo</li>
              <li>Maximum 72 characters</li>
              <li>Sagutin: "Kapag na-apply ito, ito ay ___"</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: 'rgba(248,81,73,.06)', border: '1px solid #f85149', borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: '#f85149', display: 'flex', alignItems: 'center', gap: 7 }}>
              <XCircle size={15} /> DON'T
            </span>
            <ul style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>Past tense — <code style={mono}>added login page</code></li>
              <li>Vague messages — <code style={mono}>fixed stuff</code></li>
              <li>Gumamit ng "I" o "we"</li>
              <li>Jargon na walang context</li>
            </ul>
          </div>
        </div>

        <h3 style={{ ...sans, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Good vs Bad Examples
        </h3>

        {/* Comparison table */}
        <div style={{ borderRadius: 8, overflow: 'hidden', display: 'flex', gap: 1, background: 'var(--border)' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
            <div style={{ background: 'rgba(248,81,73,.08)', padding: '10px 14px', borderBottom: '1px solid #f85149', display: 'flex', alignItems: 'center', gap: 6 }}>
              <XCircle size={13} style={{ color: '#f85149' }} />
              <span style={{ ...sans, fontSize: 11, fontWeight: 700, color: '#f85149' }}>BAD</span>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <pre style={{ ...mono, fontSize: 12, color: 'var(--text-muted)', lineHeight: 2, margin: 0 }}>
                {`fixed bug\nupdated styles\nadded new feature\nWIP\nchanges\npls work\nFINAL`}
              </pre>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
            <div style={{ background: 'rgba(63,185,80,.06)', padding: '10px 14px', borderBottom: '1px solid var(--active-border)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={13} style={{ color: 'var(--accent)' }} />
              <span style={{ ...sans, fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>GOOD</span>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <pre style={{ ...mono, fontSize: 12, color: 'var(--text-link)', lineHeight: 2, margin: 0 }}>
                {`fix(auth): resolve null pointer on logout\nstyle(nav): fix mobile hamburger alignment\nfeat(cart): add quantity selector to product card\nfeat(checkout): add payment form validation\nrefactor(api): extract validation logic to module\nfix(build): resolve webpack path resolution error\nchore(release): bump version to 2.0.0`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sec 6 — The Body ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>The Body</h2>

        <CalloutBox Icon={Info} label="Kailan Gamitin ang Body?" variant="blue">
          Hindi laging kailangan ang body. Ginagamit lang ito kapag kailangan ng mas maraming context.
          <br /><br />
          Ang body ay sumasagot ng <strong style={{ color: 'var(--text-primary)' }}>BAKIT</strong>, hindi PAANO.
        </CalloutBox>

        <CodeBlock
          filename="commit-body-example.txt"
          code={`fix(auth): resolve session timeout on mobile devices

Users reported being logged out unexpectedly
after 5 minutes of inactivity on mobile browsers.

The issue was caused by the session token not being
refreshed properly on mobile. Increased the refresh
interval and added a fallback token renewal mechanism.

Closes #234`}
        />
      </section>

      {/* ── Sec 7 — Breaking Changes ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Breaking Changes</h2>

        <CalloutBox Icon={AlertTriangle} label="Ano ang BREAKING CHANGE?" variant="red">
          Ang BREAKING CHANGE ay isang pagbabago na hindi na compatible sa previous version.
          <ul style={{ margin: '8px 0 0 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <li>Nag-rename ng API endpoint</li>
            <li>Nag-remove ng feature</li>
            <li>Nagbago ng function signature</li>
          </ul>
        </CalloutBox>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: '2px solid #f85149' }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
              Method 1 — Exclamation Mark (!)
            </span>
            <code style={{ ...mono, fontSize: 13, color: 'var(--text-link)' }}>
              feat(api)!: rename /users endpoint to /accounts
            </code>
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: '2px solid var(--text-warning)' }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
              Method 2 — BREAKING CHANGE in Footer
            </span>
            <CodeBlock
              filename="breaking-change-footer.txt"
              code={`feat(api): rename users endpoint to accounts

BREAKING CHANGE: The /users endpoint has been renamed
to /accounts. All clients must update their API calls.
Migration guide: docs/migration-v2.md

Closes #456`}
            />
          </div>
        </div>

        <CalloutBox Icon={Lightbulb} label="Tip" variant="green">
          Ang commits na may BREAKING CHANGE ay nagti-trigger ng MAJOR version bump:{' '}
          <code style={{ ...mono, fontSize: 12 }}>1.0.0 → 2.0.0</code>{' '}
          kapag gumagamit ng automated versioning tools.
        </CalloutBox>
      </section>

      {/* ── Sec 9 — Real Project Examples ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Real Project Examples (Pinoy Context)
        </h2>

        <CodeBlock
          filename="E-commerce Site — Commit History"
          code={`feat(products): add product search with filters
feat(cart): implement add to cart functionality
feat(checkout): add GCash payment option
fix(orders): resolve duplicate order on double click
fix(products): correct price display for sale items
style(homepage): improve mobile product grid layout
perf(images): add lazy loading for product images
docs(api): document checkout endpoints
chore(deps): update payment gateway SDK to v3.0`}
        />
      </section>

      {/* ── Sec 15 — Quick Reference ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Quick Reference</h2>

        <div style={{ borderRadius: 10, overflow: 'hidden', display: 'flex', gap: 1, background: 'var(--border)' }}>
          {/* Type */}
          <div style={{ flex: '0 0 100px', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>TYPE</span>
            </div>
            <div style={{ padding: '10px 14px' }}>
              <pre style={{ ...mono, fontSize: 12, color: 'var(--text-link)', lineHeight: 2.2, margin: 0 }}>
                {`feat\nfix\ndocs\nstyle\nrefactor\ntest\nchore\nperf\nbuild\nci\nrevert`}
              </pre>
            </div>
          </div>
          {/* When */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', minWidth: 0 }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>WHEN TO USE</span>
            </div>
            <div style={{ padding: '10px 14px' }}>
              <pre style={{ ...sans, fontSize: 12, color: 'var(--text-muted)', lineHeight: 2.2, margin: 0 }}>
                {`bagong feature\nbug fix\ndocumentation\nformatting\ncode cleanup\ntests\nmaintenance\nperformance\nbuild system\nCI/CD\nundo commit`}
              </pre>
            </div>
          </div>
          {/* Example */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', minWidth: 0 }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>EXAMPLE</span>
            </div>
            <div style={{ padding: '10px 14px' }}>
              <pre style={{ ...mono, fontSize: 12, color: 'var(--text-link)', lineHeight: 2.2, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {`feat(auth): add login\nfix(api): resolve 500 error\ndocs: update README\nstyle: fix indentation\nrefactor: simplify logic\ntest: add unit tests\nchore: update deps\nperf: optimize queries\nbuild: update webpack\nci: add GitHub Actions\nrevert: revert feat login`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sec 17 — Next Steps ── */}
      <div style={{
        background: 'var(--accent-dim)',
        borderRadius: 16, padding: '40px 32px',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <Trophy size={40} style={{ color: '#ffffff' }} strokeWidth={1.5} />
        <h3 style={{ ...sans, fontSize: 28, fontWeight: 700, color: '#ffffff', margin: 0 }}>
          Ayos! Conventional Commits pro ka na!
        </h3>
        <p style={{ ...sans, fontSize: 16, color: '#b5f5c0', lineHeight: 1.5, margin: 0 }}>
          Handa ka na para sa Practice Projects — doon mo maa-apply ang lahat ng natutunan mo sa real-world scenarios.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          <a
            href="/lessons/practice"
            style={{ padding: '14px 20px', borderRadius: 8, background: '#ffffff', color: 'var(--accent-dim)', ...sans, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            Practice Projects →
          </a>
          <a
            href="/lessons/cheat-sheet"
            style={{ padding: '14px 20px', borderRadius: 8, background: 'transparent', border: '2px solid #ffffff', color: '#ffffff', ...sans, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}
          >
            ← Command Cheat Sheet
          </a>
        </div>
      </div>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
