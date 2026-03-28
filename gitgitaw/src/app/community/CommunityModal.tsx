import { useEffect, useId, type CSSProperties } from 'react'
import { X } from 'lucide-react'
import CommunityUiverseCard from './CommunityUiverseCard'
import { getCommunityCopy } from './communityStrings'
import { DISCORD_INVITE_URL, FACEBOOK_GROUP_URL, FEEDBACK_ISSUES_URL } from './communityUrls'
import { useAppLanguage } from '../../hooks/useAppLanguage'

const sans: CSSProperties = { fontFamily: 'Inter, sans-serif' }
const mono: CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }

export default function CommunityModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lang = useAppLanguage()
  const c = getCommunityCopy(lang)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="community-modal-backdrop"
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'color-mix(in srgb, var(--bg-primary) 28%, transparent)',
        backdropFilter: 'blur(16px) saturate(1.08)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 900,
          maxHeight: '90vh',
          overflow: 'auto',
          background: 'var(--bg-secondary)',
          border: '1px solid color-mix(in srgb, var(--accent) 22%, var(--border))',
          borderRadius: 12,
          padding: '28px 24px 32px',
          boxShadow:
            '0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent), 0 24px 80px color-mix(in srgb, var(--bg-primary) 40%, black)',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={c.closeModal}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={20} aria-hidden />
        </button>

        <h2 id={titleId} style={{ ...sans, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0, paddingRight: 48 }}>
          {c.modalTitle}
        </h2>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.55 }}>{c.modalHint}</p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 28,
            justifyContent: 'center',
            marginTop: 28,
            padding: '8px 0 4px',
          }}
        >
          <CommunityUiverseCard
            platform="facebook"
            href={FACEBOOK_GROUP_URL}
            bottomText={c.facebook.bottom}
            logoBottomText={c.facebook.logo}
            logoContinuation="acebook"
            ariaLabel={c.facebook.aria}
          />
          <CommunityUiverseCard
            platform="discord"
            href={DISCORD_INVITE_URL}
            bottomText={c.discord.bottom}
            logoBottomText={c.discord.logo}
            logoContinuation="iscord"
            ariaLabel={c.discord.aria}
          />
          <CommunityUiverseCard
            platform="feedback"
            href={FEEDBACK_ISSUES_URL}
            bottomText={c.feedback.bottom}
            logoBottomText={c.feedback.logo}
            logoContinuation={c.feedback.suffix}
            ariaLabel={c.feedback.aria}
          />
        </div>

        <p style={{ ...mono, fontSize: 11, color: 'var(--text-muted)', marginTop: 24, textAlign: 'center', opacity: 0.85 }}>
          {c.credit}{' '}
          <a href="https://uiverse.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-link)' }}>
            uiverse.io
          </a>
          .
        </p>
      </div>
    </div>
  )
}
