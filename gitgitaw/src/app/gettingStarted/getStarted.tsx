import React from 'react'
import Footer from '../../Components/Footer'
import gitHubLogo from '../../assets/github-60.svg'
import gitLogo from '../../assets/git.svg'
import windowsLogo from '../../assets/windows.svg'
import macLogo from '../../assets/mac-60.svg'
import linuxLogo from '../../assets/linux.svg'

export default function GetStarted() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, padding: '48px 56px' }}>
      <BreadcrumbSection />
      <PageHeaderSection />
      <GitVsGitHubSection />
      <RequirementsSection />
      <InstallGitSection />
      <CreateGitHubAccountSection />
      <Footer />
    </div>
  )
}

const gitCards = [
  {
    icon: gitLogo,
    useSvg: true,
    title: 'Ano ang Git?',
    desc: 'Ang Git ay isang version control system. Para itong advanced na CTRL+Z para sa iyong files at code. Nire-record nito ang bawat pagbabago na ginagawa mo.',
  },
  {
    icon: gitHubLogo,
    useSvg: true,
    title: 'Ano ang GitHub?',
    desc: 'Ang GitHub ay isang website kung saan mo sine-save ang iyong Git projects online. Para itong cloud storage para sa code at pwede mo rin itong i-share sa iba.',
  },
]

const gitCardsSteps = [
  {
    icon: gitHubLogo,
    useSvg: true,
    number: '01',
    desc: 'Pumunta sa github.com.',
  },
  {
    icon: gitLogo,
    useSvg: true,
    number: '02',
    desc: 'I-click ang Sign Up.',
  },
  {
    icon: gitLogo,
    useSvg: true,
    number: '03',
    desc: 'Piliin ang Free Plan.',
  },
  {
    icon: gitLogo,
    useSvg: true,
    number: '04',
    desc: 'I-verify ang inyong email.',
  },
]

function BreadcrumbSection() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 14 }}>
      <span style={{ color: 'var(--accent-dim)' }}>Home</span>
      <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
      <span style={{ color: 'var(--text-muted)' }}>Getting Started</span>
    </div>
  )
}

function PageHeaderSection() {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h1 style={{ fontSize: 40, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
        Getting Started
      </h1>
      
      <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', margin: 0 }}>
        Simulan natin. Step by step, malinaw ang bawat proseso.
      </p>
    </header>
  )
}

function GitVsGitHubSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e6edf3', fontFamily: 'Inter, sans-serif', margin: 0 }}>
        Ano ang Git at GitHub?
      </h2>

      <div style={{ display: 'flex', gap: 20 }}>
        {gitCards.map((card) => (
          <div
            key={card.title}
            style={{
              flex: 1,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: 'var(--bg-secondary)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {card.useSvg ? (
                <img src={card.icon} alt="Git logo" style={{ width: 30, height: 30, filter: 'brightness(0) invert(1)' }} />
              ) : (
                <span style={{ fontSize: 22 }}>{card.icon}</span>
              )}
            </div>

            <h3 style={{ fontWeight: 600, fontSize: 17, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {card.title}
            </h3>

            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
      
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--accent-dim)',
          borderRadius: 8,
          padding: '14px 16px',
        }}
      >
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif', margin: 0 }}>
          Simple lang: Git = tool sa computer mo. GitHub = website para sa online storage at collaboration.
        </p>
      </div>
    </div>
  )
}

const requirements = [
  { icon: '', title: 'Isang Computer', desc: 'Windows, Mac, o Linux. Pwede lahat!' },
  { icon: '', title: 'Internet Connection', desc: 'Para ma-download ang Git at ma-access ang GitHub' },
  { icon: '', title: 'Willingness to Learn', desc: 'Huwag matakot sa terminal. Mas madali ito kaysa sa iniisip mo.' },
]

function RequirementsSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e6edf3', fontFamily: 'Inter, sans-serif', margin: 0 }}>
        Ano ang kailangan mo?
      </h2>

      <div style={{ display: 'flex', gap: 20 }}>
        {requirements.map((req) => (
          <div
            key={req.title}
            style={{
              flex: 1,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <h3 style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {req.icon}  {req.title}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {req.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
            Hindi ka sure kung anong OS mo?
          </span>

          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>⌄</span>
        </div>

        <div style={{ height: 1, background: 'var(--border)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <img src={windowsLogo} alt="" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />
            Windows: I-click ang Start &gt; Settings &gt; System &gt; About
          </span>

          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <img src={macLogo} alt="" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />
            Mac: I-click ang Apple logo &gt; About This Mac
          </span>

          <span
            style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <img src={linuxLogo} alt="Linux Logo" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />
            Linux: I-type sa terminal: uname -a
          </span>
        </div>
      </div>
    </div>
  )
}

function InstallGitSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
          I-install ang Git
        </h2>

        <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
          Sundan ang tatlong steps na ito para mai-setup ang Git sa iyong computer.
        </p>
      </div>

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '2px solid var(--accent-dim)',
          borderRadius: 12,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--accent-dim)', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
          STEP 1
        </div>

        <h3 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
          I-download ang Git.
        </h3>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif', margin: 0 }}>
          Libre itong i-download. Piliin ang version na para sa iyong operating system:
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="https://git-scm.com/download/win"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              background: 'var(--accent-dim)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={windowsLogo} alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
            Download for Windows
          </a>

          <a
            href="https://git-scm.com/download/mac"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={macLogo} alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
            Download for Mac
          </a>
          
          <a
            href="https://git-scm.com/download/linux"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={linuxLogo} alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
            Download for Linux
          </a>
        </div>

        <div
          style={{
          background: 'var(--bg-secondary)',
            borderRadius: 6,
            padding: '10px 14px',
          }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Kung hindi ka sigurado, kadalasan Windows ang gamit ng karamihan.
          </p>
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '2px solid var(--accent-dim)',
          borderRadius: 12,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--accent-dim)', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
          STEP 2
        </div>

        <h3 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
          I-install sa iyong computer.
        </h3>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif', margin: 0 }}>
          Libre itong i-download. Piliin ang version na para sa iyong operating system:
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="https://git-scm.com/download/win"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              background: 'var(--accent-dim)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={windowsLogo} alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
            Download for Windows
          </a>

          <a
            href="https://git-scm.com/download/mac"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={macLogo} alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
            Download for Mac
          </a>
          
          <a
            href="https://git-scm.com/download/linux"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
            }}
          >
            Download for Linux
          </a>
        </div>
        
        <div
          style={{
          background: 'var(--bg-secondary)',
            borderRadius: 6,
            padding: '10px 14px',
          }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Kung hindi ka sigurado, kadalasan Windows ang gamit ng karamihan.
          </p>
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '2px solid var(--accent-dim)',
          borderRadius: 12,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--accent-dim)', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
          STEP 3
        </div>

        <h3 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
          I-configure ang Git.
        </h3>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif', margin: 0 }}>
          Libre itong i-download. Piliin ang version na para sa iyong operating system:
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="https://git-scm.com/download/win"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              background: 'var(--accent-dim)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={windowsLogo} alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
            Download for Windows
          </a>

          <a
            href="https://git-scm.com/download/mac"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={macLogo} alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
            Download for Mac
          </a>
          
          <a
            href="https://git-scm.com/download/linux"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 20px',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
            }}
          >
            Download for Linux
          </a>
        </div>
        
        <div
          style={{
          background: 'var(--bg-secondary)',
            borderRadius: 6,
            padding: '10px 14px',
          }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Kung hindi ka sigurado, kadalasan Windows ang gamit ng karamihan.
          </p>
        </div>
      </div>
    </div>
  )
}

function CreateGitHubAccountSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
        Gumawa ng GitHub Account
      </h2>

      <div style={{ display: 'flex', gap: 20 }}>
        {gitCardsSteps.map((card) => (
          <div
            key={card.number}
            style={{
              flex: 1,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: 'var(--bg-secondary)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {card.useSvg ? (
                <img src={card.icon} alt="Git logo" style={{ width: 30, height: 30, filter: 'brightness(0) invert(1)' }} />
              ) : (
                <span style={{ fontSize: 22 }}>{card.icon}</span>
              )}
            </div>

            <h3 style={{ fontWeight: 600, fontSize: 17, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {card.number}
            </h3>

            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
            Tips para sa GitHub Profile mo:
          </span>

          <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>⌄</span>
        </div>
        
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 20, margin: 0, listStylePosition: 'inside', }}>
          <li style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', display: 'list-item' }}>
            Windows: I-click ang Start &gt; Settings &gt; System &gt; About
          </li>

          <li style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', display: 'list-item' }}> 
            Mac: I-click ang Apple logo &gt; About This Mac
          </li>

          <li style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', display: 'list-item' }}>
            Linux: I-type sa terminal: uname -a
          </li>
        </ul>
      </div>

    </div>
  )
}