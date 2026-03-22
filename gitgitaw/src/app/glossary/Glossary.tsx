import { useMemo, useState } from 'react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'

const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }
const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }

type Term = { term: string; def: string; tags?: string[] }

type TagFilter = 'all' | 'git' | 'github' | 'collab'

const TAG_FILTERS: { id: TagFilter; label: string; hint: string }[] = [
  { id: 'all', label: 'Lahat', hint: 'Lahat ng termino' },
  { id: 'git', label: 'Git', hint: 'Local commands, commits, branches' },
  { id: 'github', label: 'GitHub', hint: 'PR, fork, remote sa GitHub' },
  { id: 'collab', label: 'Collaboration', hint: 'Team workflow, code review' },
]

/** Mga termino mula sa mga lesson ng GitGit Aw (Git, GitHub, collaboration). */
const GLOSSARY_TERMS: Term[] = [
  { term: 'Branch', def: 'Hiwalay na linya ng development mula sa main code. Pwedeng mag-experiment nang hindi sinisira ang main.', tags: ['git'] },
  { term: 'Branch protection', def: 'Mga rule sa GitHub (hal. required review, walang direktang push) para protektahan ang main o critical branches.', tags: ['github'] },
  { term: 'Checkout / Switch', def: 'Lumipat sa ibang branch o commit. Sa modern Git, `git switch` ang inirerekomenda para sa branches.', tags: ['git'] },
  { term: 'Clone', def: 'Kumuha ng kopya ng remote repository sa iyong computer kasama ang buong history.', tags: ['git'] },
  { term: 'Code review', def: 'Pagsusuri ng code ng kapwa developer bago i-merge — para sa quality, bugs, at shared standards.', tags: ['collab'] },
  { term: 'Commit', def: 'Snapshot ng mga pagbabago sa repository na may message; bahagi ng permanent history ng project.', tags: ['git'] },
  { term: 'Conflict (merge conflict)', def: 'Situasyon kung saan hindi awtomatikong ma-merge ang Git dahil nagkaiba ang edits sa parehong bahagi ng file.', tags: ['git'] },
  { term: 'Conventional commits', def: 'Format ng commit message (hal. feat:, fix:, docs:) para sa malinaw na history at automation.', tags: ['git'] },
  { term: 'Diff', def: 'Pagkakaiba ng content sa pagitan ng versions, branches, o commits.', tags: ['git'] },
  { term: 'Fetch', def: 'Kunin ang updates mula sa remote nang hindi pa ine-merge sa iyong working branch.', tags: ['git'] },
  { term: 'Fork', def: 'Personal na kopya ng ibang repo sa GitHub account mo — karaniwan sa open-source bago mag-PR sa original.', tags: ['github'] },
  { term: 'HEAD', def: 'Pointer sa kasalukuyang commit na naka-checkout sa iyong local repo.', tags: ['git'] },
  { term: 'Index (staging area)', def: 'Git area kung saan pinipili mong files ang isasama sa susunod na commit.', tags: ['git'] },
  { term: 'Issue', def: 'GitHub item para mag-track ng bugs, tasks, o discussion — madalas naka-link sa PRs.', tags: ['github'] },
  { term: 'Main / master', def: 'Pangunahing production branch kung saan karaniwang stable ang code.', tags: ['git'] },
  { term: 'Merge', def: 'Pagsasama ng history ng isang branch sa isa pa (hal. feature → main).', tags: ['git'] },
  { term: 'Merge commit', def: 'Commit na ginawa ng Git na pinagsasama ang dalawang diverged histories.', tags: ['git'] },
  { term: 'Origin', def: 'Default na pangalan ng remote na naka-point sa clone source (karaniwang GitHub).', tags: ['git'] },
  { term: 'Pull', def: 'Fetch + merge: kunin ang remote changes at isama sa kasalukuyang branch.', tags: ['git'] },
  { term: 'Pull Request (PR)', def: 'Sa GitHub, hiling na i-review at i-merge ang branch mo sa target branch.', tags: ['github'] },
  { term: 'Push', def: 'I-upload ang local commits papunta sa remote repository.', tags: ['git'] },
  { term: 'Rebase', def: 'I-replay ang commits sa ibabaw ng ibang base commit para linear o malinis na history.', tags: ['git'] },
  { term: 'Remote', def: 'Remote na kopya ng repo (hal. sa GitHub) na `origin` o `upstream`.', tags: ['git'] },
  { term: 'Repository (repo)', def: 'Folder na may Git history — source code + `.git` na nagtatago ng commits at branches.', tags: ['git'] },
  { term: 'Resolved (conversation)', def: 'Sa PR review, mark na na-address na ang comment o thread.', tags: ['github'] },
  { term: 'Squash merge', def: 'I-merge ang PR bilang isang commit lang sa target branch — malinis na history.', tags: ['github'] },
  { term: 'Stash', def: 'Pansamantalang itabi ang hindi pa na-commit na changes para makapag-switch ng branch.', tags: ['git'] },
  { term: 'Staging', def: 'Ang proseso ng `git add` — paghahanda ng changes para sa commit.', tags: ['git'] },
  { term: 'Upstream', def: 'Remote na original na repo (lalo na kapag nag-fork ka) — dito nagsi-sync ang updates.', tags: ['github'] },
  { term: 'Version control', def: 'Sistema (tulad ng Git) na nagre-record ng pagbabago sa files sa paglipas ng panahon.', tags: ['git'] },
  { term: 'Working directory', def: 'Mga file na nakikita mo sa disk — maaaring may changes na hindi pa staged o committed.', tags: ['git'] },
  { term: '.gitignore', def: 'File na nagsasabi kay Git kung aling paths ang hindi dapat i-track.', tags: ['git'] },
]

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
}

export default function GlossaryPage() {
  const { showBackToTop, scrollToTop } = useBackToTop()
  const [q, setQ] = useState('')
  const [tagFilter, setTagFilter] = useState<TagFilter>('all')

  const filtered = useMemo(() => {
    let list = GLOSSARY_TERMS
    if (tagFilter !== 'all') {
      list = list.filter((t) => t.tags?.includes(tagFilter))
    }
    const n = normalize(q.trim())
    if (!n) return list
    return list.filter(
      (t) =>
        normalize(t.term).includes(n) ||
        normalize(t.def).includes(n) ||
        (t.tags && t.tags.some((tag) => normalize(tag).includes(n))),
    )
  }, [q, tagFilter])

  const grouped = useMemo(() => {
    const map = new Map<string, Term[]>()
    for (const t of filtered) {
      const letter = t.term[0]?.toUpperCase() || '#'
      const key = /[A-Z]/i.test(letter) ? letter : '#'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(t)
    }
    for (const arr of map.values()) arr.sort((a, b) => a.term.localeCompare(b.term))
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  return (
    <div className="lesson-page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: 'var(--accent-dim)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>Glossary</span>
      </div>

      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h1 className="lesson-page-title" style={{ ...sans, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Glossary
        </h1>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Mga termino sa Git, GitHub, at collaboration — batay sa nilalaman ng GitGit Aw.
        </p>
      </header>

      <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 10 }}>
            Salain ayon sa paksa
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TAG_FILTERS.map((f) => {
              const active = tagFilter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  title={f.hint}
                  onClick={() => setTagFilter(f.id)}
                  style={{
                    ...sans,
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                    padding: '8px 14px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    border: active ? '1px solid var(--active-border)' : '1px solid var(--border)',
                    background: active ? 'var(--active-bg)' : 'var(--bg-secondary)',
                    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                  }}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label htmlFor="glossary-search" style={{ ...sans, fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
            Hanapin sa teksto
          </label>
          <input
            id="glossary-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Hal. merge, PR, fork..."
            style={{
              ...sans,
              width: '100%',
              maxWidth: 400,
              padding: '12px 14px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 15,
            }}
          />
          <p style={{ ...mono, fontSize: 12, color: 'var(--text-muted)', margin: '10px 0 0' }}>
            {filtered.length} na term
            {tagFilter !== 'all' || q.trim()
              ? ` (mula sa ${GLOSSARY_TERMS.length} kabuuan)`
              : ''}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {grouped.map(([letter, terms]) => (
          <section key={letter}>
            <h2 style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em', margin: '0 0 12px', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
              {letter}
            </h2>
            <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {terms.map((t) => (
                <div key={t.term} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                  <dt style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{t.term}</dt>
                  <dd style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{t.def}</dd>
                  {t.tags && t.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                      {t.tags.map((tag) => (
                        <span key={tag} style={{ ...mono, fontSize: 10, color: 'var(--accent-dim)', background: 'var(--active-bg)', padding: '2px 8px', borderRadius: 4 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ ...sans, color: 'var(--text-muted)' }}>
          Walang tumugma{q.trim() ? ` sa &quot;${q}&quot;` : ''}
          {tagFilter !== 'all' ? ` sa filter na &quot;${TAG_FILTERS.find((x) => x.id === tagFilter)?.label}&quot;` : ''}.
          Subukan ang ibang salita o piliin ang &quot;Lahat&quot;.
        </p>
      )}

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
