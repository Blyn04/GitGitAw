import styles from './CommunityUiverseCard.module.css'

export type CommunityUiversePlatform = 'facebook' | 'discord' | 'feedback'

export type CommunityUiverseCardProps = {
  platform: CommunityUiversePlatform
  href: string
  bottomText: string
  logoBottomText: string
  /** Second part of the word revealed on hover (e.g. "acebook", "iscord", "eedback"). */
  logoContinuation: string
  ariaLabel: string
}

function FacebookMark() {
  return (
    <svg className={styles.logoMain} viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-2.085.396-4.05 1.984-5.475 1.588-1.426 3.729-1.858 5.847-1.62 1.055.12 2.107.35 3.106.634V10.29h-.853c-1.97 0-2.584.94-2.584 2.51v1.244h4.86l-.634 3.667h-4.226v7.98H9.101z" />
    </svg>
  )
}

function DiscordMark() {
  return (
    <svg className={styles.logoMain} viewBox="0 0 24 24" width={30} height={30} aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export default function CommunityUiverseCard({
  platform,
  href,
  bottomText,
  logoBottomText,
  logoContinuation,
  ariaLabel,
}: CommunityUiverseCardProps) {
  const mark =
    platform === 'facebook' ? (
      <FacebookMark />
    ) : platform === 'discord' ? (
      <DiscordMark />
    ) : (
      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: 'var(--accent)',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
        aria-hidden
      >
        F
      </span>
    )

  return (
    <a
      className={styles.card}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <div className={styles.border} aria-hidden />
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles.logo1}>{mark}</div>
          <div className={styles.logo2}>
            <span
              style={{
                color: 'var(--accent)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {logoContinuation}
            </span>
          </div>
          <span className={styles.trail} aria-hidden />
        </div>
        <span className={styles.logoBottomText}>{logoBottomText}</span>
      </div>
      <span className={styles.bottomText}>{bottomText}</span>
    </a>
  )
}
