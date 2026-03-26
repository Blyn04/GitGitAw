import { useState, useCallback } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ProjectRecord {
  completed: boolean
  stars: 0 | 1 | 2 | 3
  xp: number
  completedAt: string
}

export interface ChallengeRecord {
  completed: boolean
  completedAt: string
}

export interface GameProgress {
  xp: number
  streak: number
  lastActiveDate: string
  projects: Record<string, ProjectRecord>
  challenges: Record<string, ChallengeRecord>
}

// ── XP table ─────────────────────────────────────────────────────────────────

const XP_TABLE: Record<Difficulty, Record<1 | 2 | 3, number>> = {
  beginner:     { 1: 50,  2: 75,  3: 100 },
  intermediate: { 1: 75,  2: 112, 3: 150 },
  advanced:     { 1: 100, 2: 150, 3: 200 },
}

const CHALLENGE_XP: Record<Difficulty, number> = {
  beginner: 50,
  intermediate: 75,
  advanced: 100,
}

// ── Level thresholds ──────────────────────────────────────────────────────────

export interface LevelInfo {
  level: number
  name: string
  currentXp: number    // XP within current level
  needed: number       // XP needed to reach next level
  pct: number          // 0-100 progress within level
}

const LEVELS = [
  { min: 0,   max: 99,   level: 1, name: 'Git Newbie' },
  { min: 100, max: 249,  level: 2, name: 'Git Apprentice' },
  { min: 250, max: 499,  level: 3, name: 'Git Practitioner' },
  { min: 500, max: Infinity, level: 4, name: 'Git Expert' },
]

function getLevelInfo(xp: number): LevelInfo {
  const tier = LEVELS.find(l => xp >= l.min && xp <= l.max) ?? LEVELS[LEVELS.length - 1]
  const isMax = tier.level === LEVELS.length
  const currentXp = xp - tier.min
  const needed = isMax ? tier.min : (LEVELS[tier.level].min - tier.min)
  const pct = isMax ? 100 : Math.min(100, Math.round((currentXp / needed) * 100))
  return { level: tier.level, name: tier.name, currentXp, needed, pct }
}

// ── Streak helpers ────────────────────────────────────────────────────────────

function todayString() {
  return new Date().toISOString().slice(0, 10)
}

function updateStreak(progress: GameProgress): GameProgress {
  const today = todayString()
  if (progress.lastActiveDate === today) return progress

  const last = new Date(progress.lastActiveDate || today)
  const diff = Math.floor((Date.now() - last.getTime()) / 86_400_000)

  return {
    ...progress,
    streak: diff <= 1 ? progress.streak + 1 : 1,
    lastActiveDate: today,
  }
}

// ── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'gitgitaw_progress'

function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as GameProgress
  } catch { /* ignore */ }
  return { xp: 0, streak: 0, lastActiveDate: '', projects: {}, challenges: {} }
}

function saveProgress(p: GameProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch { /* ignore */ }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(loadProgress)

  const levelInfo = getLevelInfo(progress.xp)

  const markProjectComplete = useCallback((
    id: string | number,
    stars: 1 | 2 | 3,
    difficulty: Difficulty = 'beginner',
  ) => {
    setProgress(prev => {
      const key = String(id)
      const existing = prev.projects[key]
      // Don't downgrade stars
      if (existing?.completed && existing.stars >= stars) return prev

      const xpEarned = XP_TABLE[difficulty][stars]
      const withStreak = updateStreak(prev)
      const next: GameProgress = {
        ...withStreak,
        xp: withStreak.xp + xpEarned,
        projects: {
          ...withStreak.projects,
          [key]: { completed: true, stars, xp: xpEarned, completedAt: new Date().toISOString() },
        },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const markChallengeComplete = useCallback((id: string | number, difficulty: Difficulty = 'beginner') => {
    setProgress(prev => {
      const key = String(id)
      if (prev.challenges[key]?.completed) return prev

      const xpEarned = CHALLENGE_XP[difficulty]
      const withStreak = updateStreak(prev)
      const next: GameProgress = {
        ...withStreak,
        xp: withStreak.xp + xpEarned,
        challenges: {
          ...withStreak.challenges,
          [key]: { completed: true, completedAt: new Date().toISOString() },
        },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    const empty: GameProgress = { xp: 0, streak: 0, lastActiveDate: '', projects: {}, challenges: {} }
    saveProgress(empty)
    setProgress(empty)
  }, [])

  // Derived counts for unlock rules
  const completedBeginnerProjects = Object.entries(progress.projects)
    .filter(([id, r]) => r.completed && Number(id) <= 3).length
  const completedIntermediateProjects = Object.entries(progress.projects)
    .filter(([id, r]) => r.completed && Number(id) >= 4 && Number(id) <= 6).length

  return {
    progress,
    levelInfo,
    markProjectComplete,
    markChallengeComplete,
    resetProgress,
    completedBeginnerProjects,
    completedIntermediateProjects,
    XP_TABLE,
    CHALLENGE_XP,
  }
}
