import { Github, ExternalLink, Heart } from 'lucide-react'
import { useCommunityModal } from '../context/CommunityModalContext'

export default function Footer() {
  const { openCommunity } = useCommunityModal()
  return (
    <footer className="site-footer">
      <div className="footer-columns">

        {/* Brand */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Github size={20} style={{ color: 'var(--text-primary)' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
              GitGit Aw
            </span>
          </div>

          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-muted)' }}>
            Learn Git the Pinoy way!
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', margin: 0 }}>
            A free, open-source learning resource for Pinoy developers. Libre at para sa lahat.
          </p>

          <div style={{
            display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8,
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '7px 12px',
          }}>
            <ExternalLink size={11} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-muted)' }}>
              yurialfrance/GitGitAw
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="footer-col">
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>
            LINKS
          </div>
          <a href="#" style={{ fontSize: 13, color: 'var(--accent-dim)', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}>
            → Source Code
          </a>
          <button
            type="button"
            onClick={() => openCommunity()}
            style={{
              fontSize: 13,
              color: 'var(--accent-dim)',
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            → Community & Feedback
          </button>
          <a href="#" style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}>
            → Apache-2.0 License
          </a>
        </div>

        {/* Created by */}
        <div className="footer-col">
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>
            CREATED BY
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
            Yuri Alfrance Egipto
          </div>
          <a
            href="https://yuriegipto-ph.web.app"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13, color: 'var(--accent-dim)', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
          >
            yuriegipto-ph.web.app
          </a>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
            Berlene Bernabe
          </div>
          <a
            href="https://blynsu.vercel.app/"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13, color: 'var(--accent-dim)', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
          >
            blynsu.vercel.app
          </a>
        </div>

      </div>

      <div style={{ height: 1, background: 'var(--border)' }} />

      <div className="footer-bottom">
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-muted)' }}>
          © 2026 GitGit Aw. Open source under Apache-2.0.
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-muted)' }}>
          Made with <Heart size={11} style={{ display: 'inline-block', verticalAlign: 'middle', color: '#f85149', fill: '#f85149', margin: '0 2px' }} /> in the Philippines
        </span>
      </div>
    </footer>
  )
}
