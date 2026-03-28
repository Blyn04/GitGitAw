import type { AppLanguage } from '../../utils/settings'

export type TagFilter = 'all' | 'git' | 'github' | 'collab'

export type GlossaryUi = {
  title: string
  subtitle: string
  filterAria: string
  searchLabel: string
  searchPlaceholder: string
  termCount: (n: number, total: number, filtered: boolean) => string
  emptyState: (q: string, tagLabel: string | undefined) => string
}

const TAG_META: Record<
  AppLanguage,
  Record<TagFilter, { label: string; hint: string }>
> = {
  tl: {
    all: { label: 'Lahat', hint: 'Lahat ng termino' },
    git: { label: 'Git', hint: 'Local commands, commits, branches' },
    github: { label: 'GitHub', hint: 'PR, fork, remote sa GitHub' },
    collab: { label: 'Collaboration', hint: 'Team workflow, code review' },
  },
  en: {
    all: { label: 'All', hint: 'All glossary terms' },
    git: { label: 'Git', hint: 'Local commands, commits, branches' },
    github: { label: 'GitHub', hint: 'PRs, forks, remotes on GitHub' },
    collab: { label: 'Collaboration', hint: 'Team workflow, code review' },
  },
}

export function getTagFilters(lang: AppLanguage) {
  const m = TAG_META[lang]
  return (['all', 'git', 'github', 'collab'] as const).map((id) => ({
    id,
    label: m[id].label,
    hint: m[id].hint,
  }))
}

export function getGlossaryUi(lang: AppLanguage): GlossaryUi {
  if (lang === 'en') {
    return {
      title: 'Glossary',
      subtitle: 'Git, GitHub, and collaboration terms from GitGit Aw lessons.',
      filterAria: 'Filter by topic',
      searchLabel: 'Search',
      searchPlaceholder: 'e.g. merge, PR, fork…',
      termCount: (n, total, filtered) =>
        filtered ? `${n} term${n === 1 ? '' : 's'} (of ${total} total)` : `${n} terms`,
      emptyState: (q, tagLabel) => {
        const parts = []
        if (q.trim()) parts.push(`nothing matches “${q}”`)
        if (tagLabel) parts.push(`in “${tagLabel}”`)
        return parts.length
          ? `No results ${parts.join(' ')}. Try another word or choose “All”.`
          : 'No results. Try another word or choose “All”.'
      },
    }
  }
  return {
    title: 'Glossary',
    subtitle: 'Mga termino sa Git, GitHub, at collaboration — batay sa nilalaman ng GitGit Aw.',
    filterAria: 'Salain ayon sa paksa',
    searchLabel: 'Hanapin sa teksto',
    searchPlaceholder: 'Hal. merge, PR, fork…',
    termCount: (n, total, filtered) =>
      `${n} na term${filtered ? ` (mula sa ${total} kabuuan)` : ''}`,
    emptyState: (q, tagLabel) => {
      let msg = 'Walang tumugma'
      if (q.trim()) msg += ` sa “${q}”`
      if (tagLabel) msg += ` sa filter na “${tagLabel}”`
      msg += '. Subukan ang ibang salita o piliin ang “Lahat”.'
      return msg
    },
  }
}
