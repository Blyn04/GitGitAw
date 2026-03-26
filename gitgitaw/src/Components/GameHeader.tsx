import React from 'react'
import { Flame, Star, Zap } from 'lucide-react'
import type { LevelInfo } from '../hooks/useGameProgress'

const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }
const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }

interface GameHeaderProps {
  xp: number
  streak: number
  levelInfo: LevelInfo
}

export default function GameHeader({ xp, streak, levelInfo }: GameHeaderProps) {
  return (
    <div className="game-header" style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
    }}>
      {/* Level badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--accent-dim)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Star size={16} fill="var(--bg-primary)" color="var(--bg-primary)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ ...sans, fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
            LVL {levelInfo.level}
          </span>
          <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
            {levelInfo.name}
          </span>
        </div>
      </div>

      {/* XP bar */}
      <div style={{ flex: 1, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...mono, fontSize: 11, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Zap size={11} /> {xp} XP
          </span>
          {levelInfo.level < 4 && (
            <span style={{ ...mono, fontSize: 10, color: 'var(--text-muted)' }}>
              {levelInfo.currentXp} / {levelInfo.needed}
            </span>
          )}
        </div>
        <div style={{
          height: 6, borderRadius: 99, background: 'var(--bg-tertiary)',
          overflow: 'hidden',
        }}>
          <div
            className="game-xp-bar-fill"
            style={{
              height: '100%',
              width: `${levelInfo.pct}%`,
              background: 'var(--accent)',
              borderRadius: 99,
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </div>

      {/* Streak */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
        background: streak > 0 ? 'rgba(227,179,65,0.12)' : 'var(--bg-tertiary)',
        border: `1px solid ${streak > 0 ? '#e3b341' : 'var(--border)'}`,
        borderRadius: 8, padding: '6px 12px',
      }}>
        <Flame size={15} color={streak > 0 ? '#e3b341' : 'var(--text-muted)'} />
        <span style={{
          ...sans, fontSize: 14, fontWeight: 700,
          color: streak > 0 ? '#e3b341' : 'var(--text-muted)',
        }}>
          {streak}
        </span>
        <span style={{ ...sans, fontSize: 11, color: 'var(--text-muted)' }}>streak</span>
      </div>
    </div>
  )
}
