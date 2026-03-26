import React from 'react'
import {
  Briefcase, Users, Globe, Rocket,
  Folder, BarChart2, Star, GitFork, Eye,
  Camera, AtSign, FileText, MapPin, Link, Pin,
  Lightbulb, Lock, Trophy,
} from 'lucide-react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'
import focusPose from '../../assets/images/GitGitAw_Mascot/Focus Pose.png'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

// ── Reusable ──────────────────────────────────────────────────────────

function IconBox({ Icon }: { Icon: React.ElementType }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 10,
      background: 'var(--active-bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--accent-dim)',
    }}>
      <Icon size={20} />
    </div>
  )
}

function TipBox({ Icon, label, text }: { Icon: React.ElementType; label: string; text: string }) {
  return (
    <div style={{ background: 'var(--active-bg)', border: '1px solid var(--accent-dim)', borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={14} /> {label}
      </span>
      <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────

export default function GitHubEssentials() {
  const { showBackToTop, scrollToTop } = useBackToTop()

  return (
    <div className="lesson-page">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 12 }}>
        <span style={{ color: 'var(--accent-dim)' }}>Home</span>
        <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
        <span style={{ color: 'var(--text-muted)' }}>GitHub Essentials</span>
      </div>

      {/* Page header */}
      <header className="lesson-header">
        <img src={focusPose} alt="GitGitAw Mascot" className="page-mascot" style={{ flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h1 className="lesson-page-title" style={{ ...sans, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            GitHub Essentials
          </h1>
          <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Ang GitHub ang pinakasikat na platform para sa pag-store, pag-share, at pag-collaborate sa code.
          </p>
        </div>
      </header>

      {/* Sec1 — Bakit Mahalaga ang GitHub? */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Bakit Mahalaga ang GitHub?
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Hindi lang ito storage — ito ang world-class na collaboration platform ng mga developers.
        </p>

        <div className="lesson-cards-row">
          {([
            { Icon: Briefcase, title: 'Portfolio Mo Ito',   desc: 'Lahat ng code mo ay makikita ng mga future employer.' },
            { Icon: Users,     title: 'Collaboration Tool', desc: 'Pwedeng magtrabaho kasama ang ibang developers kahit saan sa mundo.' },
            { Icon: Globe,     title: 'Open Source Hub',    desc: 'Milyon-milyong open source projects na pwede mong i-contribute.' },
            { Icon: Rocket,    title: 'Free Hosting',       desc: 'GitHub Pages: libre na hosting para sa iyong portfolio o project website.' },
          ] as { Icon: React.ElementType; title: string; desc: string }[]).map((c) => (
            <div
              key={c.title}
              style={{
                flex: 1,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <IconBox Icon={c.Icon} />
              <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h3>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <TipBox
          Icon={Lightbulb}
          label="Pro Tip"
          text="Kahit hindi ka pa professional developer, kailangan mo ng GitHub account. Libre siya at mag-o-open ng maraming oportunidad para sa iyo."
        />
      </section>

      {/* Sec2 — GitHub Interface */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          GitHub Interface
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Alamin ang mga pangunahing bahagi ng GitHub na palagi mong gagamitin.
        </p>

        {/* Row 1 — Repo, Insights, Stars */}
        <div className="lesson-cards-row">
          {([
            { Icon: Folder,    title: 'Repository Page',    desc: "Dito mo makikita ang lahat ng files, commits, branches, at issues ng isang project.", tip: "I-explore ang iba't ibang repos ng sikat na open source projects!" },
            { Icon: BarChart2, title: 'Insights & Activity', desc: 'Tingnan ang contribution graph, traffic, at activity ng iyong repository.',              tip: null },
            { Icon: Star,      title: 'Stars',               desc: 'Ang stars ay parang Like button ng GitHub. Mas maraming stars, mas popular ang project.',  tip: 'I-star ang mga projects na gusto mo para madali mong mahanap ulit!' },
          ] as { Icon: React.ElementType; title: string; desc: string; tip: string | null }[]).map((c) => (
            <div
              key={c.title}
              style={{
                flex: 1,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <IconBox Icon={c.Icon} />
              <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h3>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
              {c.tip && (
                <div style={{ background: 'var(--active-bg)', border: '1px solid var(--accent-dim)', borderRadius: 6, padding: '10px 12px', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <Lightbulb size={12} style={{ color: 'var(--accent-dim)', flexShrink: 0, marginTop: 1 }} />
                  <p style={{ ...sans, fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{c.tip}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2 — Forks, Watch */}
        <div className="lesson-cards-row">
          {([
            { Icon: GitFork, title: 'Forks', desc: 'I-fork ang isang repo para gumawa ng sariling kopya. Pwede mong i-modify nang hindi nakakaapekto sa original.' },
            { Icon: Eye,     title: 'Watch', desc: 'Mag-subscribe sa notifications ng isang repo. Malalaman mo ang lahat ng updates at discussions.' },
          ] as { Icon: React.ElementType; title: string; desc: string }[]).map((c) => (
            <div
              key={c.title}
              style={{
                flex: 1,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <IconBox Icon={c.Icon} />
              <h3 style={{ ...sans, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.title}</h3>
              <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sec3 — GitHub Profile Anatomy */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ ...sans, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          GitHub Profile Anatomy
        </h2>
        <p style={{ ...sans, fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Ang iyong GitHub profile ay ang iyong developer identity. Siguraduhing kumpleto at presentable ito.
        </p>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h3 style={{ ...sans, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Profile Anatomy</h3>

          <div className="lesson-cards-row">
            {/* Column 1 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {([
                { Icon: Camera,   title: 'Profile Picture', desc: 'I-upload ang professional na larawan. First impression ito sa mga recruiter at future collaborators.' },
                { Icon: AtSign,   title: 'Username',        desc: 'Gamitin ang professional na username. Ito ang magiging URL ng iyong profile.' },
                { Icon: FileText, title: 'Bio',             desc: 'Isang sentence na nagpapakilala sa iyo. Hal: Filipino dev | React & Node.js' },
              ] as { Icon: React.ElementType; title: string; desc: string }[]).map((item) => (
                <div key={item.title} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <item.Icon size={14} style={{ color: 'var(--accent-dim)', flexShrink: 0 }} />
                    {item.title}
                  </span>
                  <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {([
                { Icon: MapPin, title: 'Location',            desc: 'Lagyan ng location mo. Makakatulong ito sa local job opportunities.' },
                { Icon: Link,   title: 'Website',             desc: 'I-link ang iyong portfolio website o LinkedIn profile.' },
                { Icon: Pin,    title: 'Pinned Repositories', desc: 'I-pin ang iyong best projects. Ito ang unang makikita ng mga bisita ng profile mo.' },
              ] as { Icon: React.ElementType; title: string; desc: string }[]).map((item) => (
                <div key={item.title} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <item.Icon size={14} style={{ color: 'var(--accent-dim)', flexShrink: 0 }} />
                    {item.title}
                  </span>
                  <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TipBox
          Icon={Lock}
          label="Secret Tip"
          text="Gumawa ng README profile repository para lumabas ang special na content sa iyong GitHub profile page! Gawin ito sa pamamagitan ng paggawa ng repo na katulad ng iyong username. Hal: github.com/username/username"
        />
      </section>

      {/* Next CTA */}
      <div style={{
        background: 'linear-gradient(180deg, var(--active-bg), var(--bg-primary))',
        border: '1px solid var(--accent-dim)',
        borderRadius: 16,
        padding: 40,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16,
      }}>
        <Trophy size={48} style={{ color: 'var(--accent-dim)' }} />
        <h3 style={{ ...sans, fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Magaling!</h3>
        <p style={{ ...sans, fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
          Naiintindihan mo na ang GitHub at kung paano gamitin ang mga pangunahing features nito.
        </p>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Next: Collaboration — pag-aralan mo kung paano magtulungan sa mga projects gamit ang GitHub.
        </p>
        <a
          href="/lessons/collaboration"
          style={{
            marginTop: 4, padding: '12px 24px', borderRadius: 8,
            background: 'var(--accent-dim)', color: 'var(--text-on-accent)',
            ...sans, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Pumunta sa Collaboration →
        </a>
      </div>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
