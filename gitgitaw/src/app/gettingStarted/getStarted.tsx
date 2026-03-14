import React, { useState } from 'react'
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
      <ConnectToGitHub />
      <FreeResources />
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
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
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
                <img src={card.icon} alt="Git logo" style={{ width: 30, height: 30, filter: 'var(--icon-filter)' }} />
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
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
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
            <img src={windowsLogo} alt="" style={{ width: 16, height: 16, filter: 'var(--icon-filter)' }} />
            Windows: I-click ang Start &gt; Settings &gt; System &gt; About
          </span>

          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <img src={macLogo} alt="" style={{ width: 16, height: 16, filter: 'var(--icon-filter)' }} />
            Mac: I-click ang Apple logo &gt; About This Mac
          </span>

          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
             <img src={linuxLogo} alt="" style={{ width: 16, height: 16, filter: 'var(--icon-filter)' }} />
             Linux: I-type sa terminal: uname -a
          </span>
        </div>
      </div>
    </div>
  )
}

function InstallGitSection() {
  const [hoverStep, setHoverStep] = useState<'1' | '2' | '3' | null>(null)

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

      {/* STEP 1 - Download */}
      <div
        onMouseEnter={() => setHoverStep('1')}
        onMouseLeave={() => setHoverStep(null)}
        style={{
          background: 'var(--bg-secondary)',
          border: hoverStep === '1' ? '2px solid var(--accent-dim)' : '1px solid var(--border)',
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
          I-download ang Git
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
            <img src={macLogo} alt="" style={{ width: 18, height: 18, filter: 'var(--icon-filter)' }} />
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
            <img src={linuxLogo} alt="" style={{ width: 18, height: 18, filter: 'var(--icon-filter)' }} />
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

      {/* STEP 2 - I-install sa iyong computer */}
      <div
        onMouseEnter={() => setHoverStep('2')}
        onMouseLeave={() => setHoverStep(null)}
        style={{
          background: 'var(--bg-secondary)',
          border: hoverStep === '2' ? '2px solid var(--accent-dim)' : '1px solid var(--border)',
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
          I-install sa iyong computer
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif', margin: 0 }}>
          I-run ang na-download na installer at sundan ang mga default na settings. Hindi mo kailangan baguhin kahit ano sa simula.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              background: 'var(--accent-dim)',
              color: 'var(--text-primary)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={windowsLogo} alt="" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />
            Windows
          </span>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={macLogo} alt="" style={{ width: 16, height: 16, filter: 'var(--icon-filter)' }} />
            Mac
          </span>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img src={linuxLogo} alt="" style={{ width: 16, height: 16, filter: 'var(--icon-filter)' }} />
            Linux
          </span>
        </div>

        {/* Code block: git --version */}
        <div
          style={{
            marginTop: 8,
            background: 'var(--bg-secondary)',
            borderRadius: 10,
            border: '1px solid var(--border)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 4,
                padding: '3px 8px',
                fontSize: 12,
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              bash
            </div>
            <div
              style={{
                borderRadius: 4,
                border: '1px solid var(--border)',
                padding: '4px 8px',
                fontSize: 12,
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              Copy
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0 6px' }} />
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--accent)' }}>$ git --version</div>
        </div>

        <div
          style={{
            marginTop: 8,
            borderRadius: 6,
            border: '1px solid var(--accent-dim)',
            padding: '10px 14px',
            background: 'var(--bg-tip)',
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Kapag may lumabas na <code style={{ fontFamily: 'JetBrains Mono, monospace' }}>git version 2.x.x</code>, ibig sabihin naka-install na ang Git sa iyong
            computer.
          </p>
        </div>
      </div>

      {/* STEP 3 - I-configure ang Git */}
      <div
        onMouseEnter={() => setHoverStep('3')}
        onMouseLeave={() => setHoverStep(null)}
        style={{
          background: 'var(--bg-secondary)',
          border: hoverStep === '3' ? '2px solid var(--accent-dim)' : '1px solid var(--border)',
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
          I-configure ang Git
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif', margin: 0 }}>
          Ito ang pangalan at email na makikita sa bawat commit mo. Pwede mo itong palitan anytime.
        </p>

        {/* Code block: git config user.name/email */}
        <div
          style={{
            marginTop: 4,
            background: 'var(--bg-secondary)',
            borderRadius: 10,
            border: '1px solid var(--border)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 4,
                padding: '3px 8px',
                fontSize: 12,
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              bash
            </div>
            <div
              style={{
                borderRadius: 4,
                border: '1px solid var(--border)',
                padding: '4px 8px',
                fontSize: 12,
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              Copy
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0 6px' }} />
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--accent)', lineHeight: 1.6 }}>
            <div>$ git config --global user.name &quot;Ang Iyong Pangalan&quot;</div>
            <div>$ git config --global user.email &quot;email@example.com&quot;</div>
          </div>
        </div>

        {/* Code block: git config --list */}
        <div
          style={{
            marginTop: 8,
            background: 'var(--bg-secondary)',
            borderRadius: 10,
            border: '1px solid var(--border)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 4,
                padding: '3px 8px',
                fontSize: 12,
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              bash
            </div>
            <div
              style={{
                borderRadius: 4,
                border: '1px solid var(--border)',
                padding: '4px 8px',
                fontSize: 12,
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              Copy
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0 6px' }} />
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--accent)' }}>$ git config --list</div>
        </div>

        <div
          style={{
            marginTop: 8,
            borderRadius: 6,
            border: '1px solid var(--accent-dim)',
            padding: '10px 14px',
            background: 'var(--bg-tip)',
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Tip: Gumamit ng email na ginagamit mo rin sa GitHub para tumama ang mga commits sa tamang account.
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

      <div style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
        {gitCardsSteps.map((card, index) => (
          <React.Fragment key={card.number}>
            <div
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
                  <img src={card.icon} alt="Git logo" style={{ width: 30, height: 30, filter: 'var(--icon-filter)' }} />
                ) : (
                  <span style={{ fontSize: 22 }}>{card.icon}</span>
                )}
              </div>

              <h3
                style={{
                  fontWeight: 600,
                  fontSize: 17,
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0,
                }}
              >
                {card.number}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  fontFamily: 'Inter, sans-serif',
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
            {index < gitCardsSteps.length - 1 && (
              <div
                style={{
                  alignSelf: 'center',
                  padding: '0 4px',
                  fontSize: 22,
                  color: 'var(--border)',
                  flexShrink: 0,
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          marginTop: 16,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <h3
          style={{
            fontWeight: 600,
            fontSize: 18,
            color: 'var(--text-primary)',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
          }}
        >
          Tips para sa GitHub profile mo
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            fontSize: 14,
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <li>Pumili ng username na professional at madaling tandaan.</li>
          <li>Maglagay ng malinaw na profile picture at maikling bio tungkol sa ginagawa mo.</li>
          <li>Optional pero maganda: i-link ang portfolio website o LinkedIn kung meron.</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: '12px 16px',
          borderRadius: 8,
          background: 'var(--bg-warning)',
          border: '1px solid var(--border-warning)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'var(--text-warning)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Siguraduhing verified ang email address mo sa GitHub para siguradong ma-li-link ang mga Git commits sa tamang
          account.
        </p>
      </div>
    </div>
  )
}

function ConnectToGitHub() {
  return (
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
          I-connect ang Git sa GitHub
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
          Para makapag-push ng code mula sa computer mo papunta sa GitHub, kailangan mong i-connect ang dalawa.
        </p>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div
            style={{
              flex: 1,
              minWidth: 260,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--accent-dim)',
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 8,
                background: 'var(--bg-secondary)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 17,
                color: 'var(--accent-dim)',
              }}
            >
              HTTPS
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
              Mas simple para sa beginners
            </h3>

            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
              Mas simple para sa beginners. Maglalagay ka ng credentials kapag kailangan. Recommended ito kung
              nagsisimula ka pa lang.
            </p>
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 260,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 8,
                background: 'var(--bg-secondary)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 17,
                color: 'var(--text-muted)',
              }}
            >
              SSH
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
              Mas advanced setup
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
              Mas advanced setup. Magse-set up ng SSH key para hindi na maglagay ng credentials sa bawat push.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 8,
            borderRadius: 6,
            border: '1px solid var(--accent-dim)',
            padding: '10px 14px',
            background: 'var(--bg-darkGreen)',
          }}
        >
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
            Sa ngayon, sapat na ang HTTPS. Pag kumportable ka na sa Git, pwede nating i-setup ang SSH keys sa susunod na
            module.
          </p>
        </div>
      </div>
  )
}

function FreeResources() {
    return (
      <>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Free Resources para Matuto Pa
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Mga libreng resources na makakatulong sa pag-practice ng Git at GitHub.
          </p>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div
              style={{
                flex: 1,
                minWidth: 260,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                YouTube 
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                Hanap ng mga Tagalog o English tutorials tungkol sa Git basics at GitHub workflow.
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 260,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                Pro Git Book
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                Libreng online book na talagang malalim magturo ng Git. Perfect kapag gusto mo nang mag-advance.
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 260,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                Learn Git Branching
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                Mga website tulad ng Git Kata at iba pa kung saan pwede kang mag-practice ng Git commands.
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 260,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                Git Practice Sites
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                Mga website tulad ng Git Kata at iba pa kung saan pwede kang mag-practice ng Git commands.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            background: 'var(--bg-darkGreen)',
            borderRadius: 16,
            border: '1px solid var(--accent-dim)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 12,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--accent)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Ayos! Naka-set up ka na ng Git at GitHub.
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: 'var(--text-muted)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Susunod na hakbang: ang unang tunay mong Git workflow.
          </p>
          <a
            href="#"
            style={{
              marginTop: 4,
              padding: '10px 22px',
              borderRadius: 999,
              background: 'var(--accent-dim)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
            }}
          >
            Dumiretso na sa “The Basics”
          </a>
        </div>
      </>
    )
  }