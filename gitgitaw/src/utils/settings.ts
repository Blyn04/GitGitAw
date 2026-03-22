export type Theme       = 'dark' | 'light'
export type AccentColor = 'green' | 'blue' | 'purple' | 'orange' | 'yellow'

export interface AppSettings {
  theme:         Theme
  accentColor:   AccentColor
  reduceMotion:  boolean
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme:        'dark',
  accentColor:  'green',
  reduceMotion: false,
}

const STORAGE_KEY = 'gitgitaw_settings'

// Per-accent vars for each theme so colours look correct in both modes
const ACCENT_PRESETS: Record<AccentColor, Record<Theme, {
  accent: string; dim: string; activeBg: string; activeBorder: string
  bgTip: string; codeBg: string; codeCmd: string; bgDarkGreen: string
}>> = {
  green: {
    dark:  { accent: '#3fb950', dim: '#238636', activeBg: '#1c2b1c', activeBorder: '#238636', bgTip: 'rgba(46,160,67,0.08)',   codeBg: '#161b22', codeCmd: '#3fb950', bgDarkGreen: '#022f13' },
    light: { accent: '#1a7f37', dim: '#1a7f37', activeBg: '#dafbe1', activeBorder: '#1a7f37', bgTip: '#dafbe1',               codeBg: '#161b22', codeCmd: '#3fb950', bgDarkGreen: '#022f13' },
  },
  blue: {
    dark:  { accent: '#79c0ff', dim: '#1f6feb', activeBg: '#0c2d6b', activeBorder: '#1f6feb', bgTip: 'rgba(31,111,235,0.10)', codeBg: '#161b22', codeCmd: '#79c0ff', bgDarkGreen: '#051d4d' },
    light: { accent: '#0969da', dim: '#0550ae', activeBg: '#ddf4ff', activeBorder: '#0969da', bgTip: '#ddf4ff',               codeBg: '#161b22', codeCmd: '#79c0ff', bgDarkGreen: '#051d4d' },
  },
  purple: {
    dark:  { accent: '#d2a8ff', dim: '#8957e5', activeBg: '#231a45', activeBorder: '#8957e5', bgTip: 'rgba(137,87,229,0.10)', codeBg: '#161b22', codeCmd: '#d2a8ff', bgDarkGreen: '#180d3d' },
    light: { accent: '#8250df', dim: '#6639ba', activeBg: '#fbefff', activeBorder: '#8250df', bgTip: '#fbefff',               codeBg: '#161b22', codeCmd: '#d2a8ff', bgDarkGreen: '#180d3d' },
  },
  orange: {
    dark:  { accent: '#ffa657', dim: '#e16d2a', activeBg: '#3d1f07', activeBorder: '#e16d2a', bgTip: 'rgba(225,109,42,0.10)', codeBg: '#161b22', codeCmd: '#ffa657', bgDarkGreen: '#3d1f07' },
    light: { accent: '#bc4c00', dim: '#953800', activeBg: '#fff1e5', activeBorder: '#bc4c00', bgTip: '#fff1e5',               codeBg: '#161b22', codeCmd: '#ffa657', bgDarkGreen: '#3d1f07' },
  },
  yellow: {
    dark:  { accent: '#e3b341', dim: '#d4a72c', activeBg: '#3d3507', activeBorder: '#d4a72c', bgTip: 'rgba(227,179,65,0.12)', codeBg: '#161b22', codeCmd: '#e3b341', bgDarkGreen: '#3d3507' },
    light: { accent: '#9a6700', dim: '#9a6700', activeBg: '#fff8dc', activeBorder: '#9a6700', bgTip: '#fff8dc',               codeBg: '#161b22', codeCmd: '#b08600', bgDarkGreen: '#fff8dc' },
  },
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  // Respect pre-existing theme key from the sidebar toggle
  const legacyTheme = localStorage.getItem('theme')
  if (legacyTheme === 'light' || legacyTheme === 'dark') {
    return { ...DEFAULT_SETTINGS, theme: legacyTheme }
  }
  return { ...DEFAULT_SETTINGS }
}

export function saveSettings(s: AppSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  localStorage.setItem('theme', s.theme) // keep Sidebar in sync
}

export function applySettings(s: AppSettings): void {
  const root = document.documentElement
  const vars = ACCENT_PRESETS[s.accentColor][s.theme]

  // 1. Theme
  root.dataset.theme = s.theme

  // 2. Accent colour (inline style overrides :root and [data-theme] equally)
  root.style.setProperty('--accent',        vars.accent)
  root.style.setProperty('--accent-dim',    vars.dim)
  root.style.setProperty('--active-bg',     vars.activeBg)
  root.style.setProperty('--active-border', vars.activeBorder)
  root.style.setProperty('--bg-tip',        vars.bgTip)
  root.style.setProperty('--bg-code',       vars.codeBg)
  root.style.setProperty('--code-text-cmd', vars.codeCmd)
  root.style.setProperty('--bg-darkGreen',  vars.bgDarkGreen)

  // 3. Reduce motion
  root.dataset.reduceMotion = s.reduceMotion ? 'true' : 'false'
}
