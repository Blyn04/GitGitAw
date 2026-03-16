import React from 'react'
import { Printer } from 'lucide-react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

type CmdRow = { cmd: string; desc: string }

function CheatCard({
  tag, title, accent, commands,
}: {
  tag: string
  title: string
  accent: string
  commands: CmdRow[]
}) {
  return (
    // cheat-card → tells print CSS "don't slice this card across a page"
    <div className="cheat-card" style={{
      flex: 1,
      background: '#161b22',
      borderRadius: 12,
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      borderLeft: `4px solid ${accent}`,
    }}>
      <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: accent }}>{tag}</span>
      <h3 style={{ ...sans, fontSize: 18, fontWeight: 700, color: '#e6edf3', margin: 0 }}>{title}</h3>
      <div style={{ height: 1, background: '#30363d' }} />
      {commands.map((row) => (
        <div key={row.cmd} style={{ display: 'flex', gap: 12, width: '100%' }}>
          <span style={{ ...mono, fontSize: 12, color: accent, flexShrink: 0, width: 210 }}>{row.cmd}</span>
          <span style={{ ...sans, fontSize: 12, color: '#8b949e' }}>{row.desc}</span>
        </div>
      ))}
    </div>
  )
}

export default function CheatSheet() {
  const { showBackToTop, scrollToTop } = useBackToTop()

  // ─── Print-only styles ───────────────────────────────────────────────────
  //
  // How pagination works:
  //   • @page sets the paper size and margins for every printed page.
  //   • .print-page      → break-after: page forces a new page AFTER this group.
  //   • .print-page-last → no forced break (it's the final group).
  //   • .cheat-card      → break-inside: avoid keeps one card on one page.
  //   • .cheat-row       → break-inside: avoid keeps a pair of cards together.
  //
  // Screen styles are kept as inline styles on the JSX elements themselves;
  // this block only overrides what needs to change for print.
  // ─────────────────────────────────────────────────────────────────────────
  const printCss = `
    @media print {
      @page {
        size: A4 portrait;
        margin: 15mm 12mm;
      }

      /* Strip the screen wrapper's padding/gap so the page groups
         fill the full printable area without extra whitespace. */
      .lesson-page {
        padding: 0 !important;
        gap: 10mm !important;
        max-width: 100% !important;
      }

      /* Hide everything that makes no sense in a PDF */
      .no-print {
        display: none !important;
      }

      /* ── Page groups ───────────────────────────────────────────────
         Each .print-page ends with a hard page break.
         .print-page-last has no break so the browser doesn't
         emit an unwanted blank final page.                          */
      .print-page {
        break-after: page;
        page-break-after: always;
        gap: 8mm !important;
      }

      .print-page-last {
        break-after: auto;
        page-break-after: auto;
        gap: 8mm !important;
      }

      /* ── Card rules ────────────────────────────────────────────────
         Prevent a card from being sliced mid-content across pages.
         If both cards in a row fit on the remaining space they stay
         together; if not, the whole row moves to the next page.    */
      .cheat-card {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .cheat-row {
        break-inside: avoid;
        page-break-inside: avoid;
        gap: 10px !important;
        flex-wrap: nowrap !important;
      }
    }
  `

  // Shared screen layout helpers
  const pageGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  }
  const rowStyle: React.CSSProperties = { display: 'flex', gap: 20, flexWrap: 'wrap' }

  return (
    <div className="lesson-page">
      <style>{printCss}</style>

      {/* Breadcrumb — hidden in print */}
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: '#238636' }}>Home</span>
        <span style={{ color: '#8b949e' }}>{'>'}</span>
        <span style={{ color: '#8b949e' }}>Command Cheat Sheet</span>
      </div>

      {/* Page Header */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <h1 className="lesson-page-title" style={{ ...sans, fontWeight: 700, color: '#e6edf3', margin: 0 }}>
            Command Cheat Sheet
          </h1>
          {/* Download button — hidden in print (it calls window.print() which opens the browser's Save as PDF dialog) */}
          <button
            type="button"
            className="no-print"
            onClick={() => window.print()}
            style={{
              ...sans, fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', borderRadius: 8, cursor: 'pointer',
              background: '#161b22', border: '1px solid #30363d',
              color: '#e6edf3', flexShrink: 0,
            }}
          >
            <Printer size={15} />
            Download/Print
          </button>
        </div>
        <p style={{ ...sans, fontSize: 16, color: '#8b949e', lineHeight: 1.5, margin: 0 }}>
          Lahat ng Git at GitHub commands na kailangan mo — sa isang lugar.
        </p>
      </header>

      {/* ── Print Page 1 ── Setup / Basic Workflow / Branching / Remote ── */}
      <div className="print-page" style={pageGroupStyle}>
        {/* Row 1 */}
        <div className="cheat-row" style={rowStyle}>
          <CheatCard
            tag="SETUP & CONFIG"
            title="Setup & Config"
            accent="#58a6ff"
            commands={[
              { cmd: 'git config --global user.name', desc: 'Set your name globally' },
              { cmd: 'git config --global user.email', desc: 'Set your email globally' },
              { cmd: 'git init', desc: 'Initialize a new repository' },
              { cmd: 'git clone [url]', desc: 'Clone a remote repository' },
              { cmd: 'git config --global color.ui auto', desc: 'Enable helpful colorized output' },
            ]}
          />
          <CheatCard
            tag="BASIC WORKFLOW"
            title="Basic Workflow"
            accent="#3fb950"
            commands={[
              { cmd: 'git status', desc: 'Show working tree status' },
              { cmd: 'git add .', desc: 'Stage all changes' },
              { cmd: 'git add [file]', desc: 'Stage a specific file' },
              { cmd: 'git commit -m "[msg]"', desc: 'Commit staged changes with a message' },
              { cmd: 'git push origin [branch]', desc: 'Push commits to remote branch' },
              { cmd: 'git diff --staged', desc: 'Diff of staged but not yet committed' },
              { cmd: 'git reset [file]', desc: 'Unstage file, keep working dir changes' },
            ]}
          />
        </div>

        {/* Row 2 */}
        <div className="cheat-row" style={rowStyle}>
          <CheatCard
            tag="BRANCHING"
            title="Branching"
            accent="#bc8cff"
            commands={[
              { cmd: 'git branch', desc: 'List all local branches' },
              { cmd: 'git switch -c [name]', desc: 'Create and switch to new branch' },
              { cmd: 'git switch [name]', desc: 'Switch to an existing branch' },
              { cmd: 'git merge [branch]', desc: 'Merge branch into current branch' },
              { cmd: 'git branch -d [name]', desc: 'Delete a merged branch' },
              { cmd: 'git branch [branch-name]', desc: 'Create a new branch at current commit' },
              { cmd: 'git log', desc: 'Show all commits in current branch history' },
            ]}
          />
          <CheatCard
            tag="REMOTE & GITHUB"
            title="Remote & GitHub"
            accent="#ffa657"
            commands={[
              { cmd: 'git remote add origin [url]', desc: 'Link local repo to remote' },
              { cmd: 'git push -u origin main', desc: 'Push and set upstream tracking' },
              { cmd: 'git pull origin [branch]', desc: 'Fetch and merge from remote' },
              { cmd: 'git fetch', desc: 'Download changes without merging' },
              { cmd: 'git merge [alias]/[branch]', desc: 'Merge remote branch into current' },
            ]}
          />
        </div>
      </div>

      {/* ── Print Page 2 ── Undoing / Inspection / Path Changes / Rewrite ── */}
      <div className="print-page" style={pageGroupStyle}>
        {/* Row 3 */}
        <div className="cheat-row" style={rowStyle}>
          <CheatCard
            tag="UNDOING CHANGES"
            title="Undoing Changes"
            accent="#f85149"
            commands={[
              { cmd: 'git restore [file]', desc: 'Discard working directory changes' },
              { cmd: 'git restore --staged [file]', desc: 'Unstage a file, keep changes' },
              { cmd: 'git revert [commit]', desc: 'Safely undo a commit (keeps history)' },
              { cmd: 'git reset --hard HEAD~1', desc: 'Remove last commit — DANGEROUS' },
              { cmd: 'git stash', desc: 'Temporarily save uncommitted changes' },
            ]}
          />
          <CheatCard
            tag="INSPECTION & LOGS"
            title="Inspection & Logs"
            accent="#39d353"
            commands={[
              { cmd: 'git log --oneline', desc: 'Compact commit history view' },
              { cmd: 'git diff', desc: 'Show unstaged file changes' },
              { cmd: 'git show [commit]', desc: 'Show details of a specific commit' },
              { cmd: 'git blame [file]', desc: 'Show who changed each line' },
              { cmd: 'git log branchB..branchA', desc: 'Commits on branchA not on branchB' },
              { cmd: 'git log --follow [file]', desc: 'Show commits that changed file, even across renames' },
              { cmd: 'git diff branchB...branchA', desc: 'Diff of what is in branchA not in branchB' },
            ]}
          />
        </div>

        {/* Row 4 */}
        <div className="cheat-row" style={rowStyle}>
          <CheatCard
            tag="TRACKING PATH CHANGES"
            title="Tracking Path Changes"
            accent="#e3b341"
            commands={[
              { cmd: 'git rm [file]', desc: 'Delete file from project and stage removal' },
              { cmd: 'git mv [existing-path] [new-path]', desc: 'Change file path and stage the move' },
              { cmd: 'git log --stat -M', desc: 'Show commit logs with moved path indicators' },
            ]}
          />
          <CheatCard
            tag="REWRITE HISTORY"
            title="Rewrite History"
            accent="#d2a8ff"
            commands={[
              { cmd: 'git rebase [branch]', desc: 'Apply current branch commits ahead of specified one' },
              { cmd: 'git reset --hard [commit]', desc: 'Clear staging area, rewrite tree from commit' },
            ]}
          />
        </div>
      </div>

      {/* ── Print Page 3 ── Stash / Ignoring + Pro Tips ── */}
      <div className="print-page-last" style={pageGroupStyle}>
        {/* Row 5 */}
        <div className="cheat-row" style={rowStyle}>
          <CheatCard
            tag="STASH COMMANDS"
            title="Stash Commands"
            accent="#79c0ff"
            commands={[
              { cmd: 'git stash', desc: 'Save modified and staged changes temporarily' },
              { cmd: 'git stash list', desc: 'List all stashed changesets' },
              { cmd: 'git stash pop', desc: 'Write working from top of stash stack' },
              { cmd: 'git stash drop', desc: 'Discard changes from top of stash stack' },
            ]}
          />
          <CheatCard
            tag="IGNORING PATTERNS"
            title="Ignoring Patterns"
            accent="#6e7681"
            commands={[
              { cmd: 'git config --global core.excludesfile [file]', desc: 'System-wide ignore pattern for all local repos' },
              { cmd: '.gitignore', desc: 'Save glob patterns (logs/, *.notes, pattern*/) to ignore unintentional staging' },
            ]}
          />
        </div>

        {/* Pro Tips Banner — inside page 3 so it stays on the same printed page */}
        <div style={{
          background: '#0d2818',
          border: '1px solid #238636',
          borderRadius: 12,
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <span style={{ ...sans, fontSize: 15, fontWeight: 700, color: '#3fb950' }}>💡  Pro Tips</span>
          <p style={{ ...sans, fontSize: 13, color: '#8b949e', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>
            {'• Laging mag-commit nang madalas — kahit maliit na change.\n• Gumamit ng descriptive branch names: feature/add-login, bugfix/fix-nav.\n• Bago mag-push, laging i-pull muna para maiwasan ang conflicts.\n• Huwag i-force push sa main/main branch ng shared repo.'}
          </p>
        </div>
      </div>

      {/* Next Steps — hidden in print */}
      <div className="no-print" style={{ background: 'var(--accent-dim)', borderRadius: 16, padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ ...sans, fontSize: 32, fontWeight: 700, color: '#ffffff', margin: 0 }}>
          Handa ka na — lahat ng commands nasa kamay mo na.
        </h3>
        <p style={{ ...sans, fontSize: 16, color: '#b5f5c0', lineHeight: 1.5, margin: 0 }}>
          Next: Conventional Commits — alamin kung paano sumulat ng maayos na commit messages.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          <a
            href="/lessons/conventional-commits"
            style={{ padding: '14px 20px', borderRadius: 8, background: '#ffffff', color: 'var(--accent-dim)', ...sans, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            Conventional Commits →
          </a>
          <a
            href="/lessons/merge-conflicts"
            style={{ padding: '14px 20px', borderRadius: 8, background: 'transparent', border: '2px solid #ffffff', color: '#ffffff', ...sans, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}
          >
            ← Merge Conflicts
          </a>
        </div>
      </div>

      <div className="no-print"><Footer /></div>
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
