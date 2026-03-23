import React from 'react'
import encouragementPose from '../../assets/images/GitGitAw_Mascot/Encouragement Pose.png'
import {
  Trophy, Target, Zap, GitBranch, GitMerge, GitCommit,
  Clock, CheckCircle2, Terminal, Search, RefreshCw,
  BookOpen, Lightbulb, ChevronRight, AlertTriangle,
  Flame, Star, Lock, Shield, Wrench, Layers,
  Scissors, Code, Network, Package, GitFork, Archive, GitPullRequest,
} from 'lucide-react'
import Footer from '../../Components/Footer'
import { useBackToTop, BackToTopButton } from '../../Components/BackToTop'

const mono: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace' }
const sans: React.CSSProperties = { fontFamily: 'Inter, sans-serif' }

// ── Difficulty config ────────────────────────────────────────────────────────

const DIFF = {
  beginner:     { label: 'Beginner',     color: '#3fb950', bg: '#1a3a1a' },
  intermediate: { label: 'Intermediate', color: '#58a6ff', bg: '#1a2040' },
  advanced:     { label: 'Advanced',     color: '#bc8cff', bg: '#2a1a40' },
}

// ── Sub-components ───────────────────────────────────────────────────────────

function DiffBadge({ level }: { level: keyof typeof DIFF }) {
  const d = DIFF[level]
  return (
    <span style={{
      ...sans, fontSize: 11, fontWeight: 700,
      color: d.color, background: d.bg,
      borderRadius: 20, padding: '3px 10px',
    }}>
      {d.label}
    </span>
  )
}

function SkillChip({ label }: { label: string }) {
  return (
    <span style={{
      ...mono, fontSize: 11,
      color: 'var(--text-muted)', background: 'var(--bg-tertiary)',
      border: '1px solid var(--border)',
      borderRadius: 4, padding: '2px 8px',
    }}>
      {label}
    </span>
  )
}

interface ChallengeCardProps {
  num: number
  title: string
  tagline: string
  description: string
  level: keyof typeof DIFF
  skills: string[]
  icon: React.ElementType
  terminalLink?: string
  isLocked?: boolean
}

function ChallengeCard({
  num, title, tagline, description, level, skills, icon: Icon, terminalLink, isLocked,
}: ChallengeCardProps) {
  const d = DIFF[level]
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: `1px solid var(--border)`,
      borderRadius: 12,
      padding: '20px',
      display: 'flex', flexDirection: 'column', gap: 14,
      flex: 1, minWidth: 0,
      opacity: isLocked ? 0.6 : 1,
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: d.bg, border: `1px solid ${d.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {isLocked
              ? <Lock size={18} style={{ color: 'var(--text-muted)' }} />
              : <Icon size={18} style={{ color: d.color }} />
            }
          </div>
          <div>
            <span style={{ ...mono, fontSize: 10, color: 'var(--text-muted)' }}>
              Challenge #{String(num).padStart(2, '0')}
            </span>
            <h3 style={{ ...sans, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
              {title}
            </h3>
          </div>
        </div>
        <DiffBadge level={level} />
      </div>

      {/* Tagline */}
      <p style={{ ...sans, fontSize: 12, fontWeight: 600, color: d.color, margin: 0 }}>
        {tagline}
      </p>

      {/* Description */}
      <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
        {description}
      </p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {skills.map(s => <SkillChip key={s} label={s} />)}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 'auto' }}>
        {isLocked ? (
          <div style={{
            ...sans, fontSize: 12, color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 12px', borderRadius: 8,
            background: 'var(--bg-tertiary)', border: '1px solid var(--border)',
          }}>
            <Lock size={12} /> Complete previous challenges to unlock
          </div>
        ) : terminalLink ? (
          <a href={terminalLink} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 14px', borderRadius: 8,
            background: d.bg, border: `1px solid ${d.color}55`,
            color: d.color, ...sans, fontSize: 13, fontWeight: 600,
            textDecoration: 'none',
          }}>
            <Terminal size={13} /> Start in Terminal <ChevronRight size={13} />
          </a>
        ) : (
          <div style={{
            ...sans, fontSize: 12, color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 12px', borderRadius: 8,
            background: 'var(--bg-tertiary)', border: '1px solid var(--border)',
          }}>
            <BookOpen size={12} /> Read the challenge and try it on your own machine
          </div>
        )}
      </div>
    </div>
  )
}

function SectionHeader({ Icon, title, subtitle, color }: {
  Icon: React.ElementType; title: string; subtitle: string; color: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${color}18`, border: `1px solid ${color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <h2 style={{ ...sans, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>
          {title}
        </h2>
        <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>{subtitle}</p>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Challenges() {
  const { showBackToTop, scrollToTop } = useBackToTop()

  return (
    <div className="lesson-page">

        {/* ── Hero ── */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 16, padding: '36px 40px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Trophy size={32} style={{ color: 'var(--text-warning)' }} strokeWidth={1.5} />
              <div>
                <h1 className="lesson-page-title" style={{ margin: 0 }}>
                  Git Challenges
                </h1>
                <p style={{ ...sans, fontSize: 14, color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  I-test ang iyong Git skills sa real-world scenarios
                </p>
              </div>
            </div>
            <img src={encouragementPose} alt="GitGitAw Mascot" style={{ height: 110, objectFit: 'contain', flexShrink: 0 }} />
          </div>

          <p style={{ ...sans, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0, maxWidth: 680 }}>
            Handa ka na bang i-prove ang iyong Git mastery? Ang bawat challenge ay dinisenyo para
            sa specific na skill — mula sa basic na <code style={{ ...mono, fontSize: 14, color: 'var(--accent)', background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: 4 }}>git log</code> investigation
            hanggang sa advanced na <code style={{ ...mono, fontSize: 14, color: 'var(--accent)', background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: 4 }}>git bisect</code> debugging.
            Subukan mo lahat!
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { icon: Flame,        label: '26 Challenges',    sub: 'Beginner to Advanced' },
              { icon: Clock,        label: '15–60 min',        sub: 'Per challenge' },
              { icon: CheckCircle2, label: 'Self-paced',       sub: 'Work at your own speed' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={16} style={{ color: 'var(--text-warning)', flexShrink: 0 }} />
                <div>
                  <div style={{ ...sans, fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{label}</div>
                  <div style={{ ...sans, fontSize: 11, color: 'var(--text-muted)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How it works ── */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionHeader
            Icon={BookOpen}
            title="Paano Gumagana ang Challenges"
            subtitle="Bago ka magsimula, alamin mo muna ang format"
            color="var(--accent)"
          />

          <div className="lesson-cards-row">
            {[
              {
                icon: Target,
                title: '1. Basahin ang Scenario',
                text: 'Ang bawat challenge ay may malinaw na scenario — isang sitwasyon na halos mangyari sa tunay na trabaho bilang developer.',
              },
              {
                icon: Terminal,
                title: '2. Subukan sa Terminal',
                text: 'Ang mga challenge na may "Start in Terminal" button ay may interactive simulator. Yung iba, gawin mo sa iyong sariling machine.',
              },
              {
                icon: CheckCircle2,
                title: '3. Validate ang Sagot',
                text: 'May expected output ang bawat challenge. Kung tama ang iyong solusyon, magiging pareho ang makikita mo sa terminal.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} style={{
                flex: 1, background: 'var(--bg-secondary)',
                border: '1px solid var(--border)', borderRadius: 12,
                padding: '20px', display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--active-bg)', border: '1px solid var(--active-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {title}
                </h3>
                <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Beginner Challenges ── */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionHeader
            Icon={Star}
            title="Beginner Challenges"
            subtitle="Para sa mga bago sa Git — practice ang fundamentals"
            color={DIFF.beginner.color}
          />

          <div className="lesson-cards-row">
            <ChallengeCard
              num={1}
              icon={Search}
              level="beginner"
              title="Git Detective"
              tagline="Sino ang nagbago nito at kailan?"
              description="May nagbago ng isang file sa repo at hindi alam kung sino. Gamitin ang git log, git show, at git blame para mahanap ang culprit at alamin ang eksaktong linya na binago."
              skills={['git log', 'git show', 'git blame', 'git diff']}
              terminalLink="/lessons/practice/1"
            />
            <ChallengeCard
              num={2}
              icon={GitCommit}
              level="beginner"
              title="Perfect Commit History"
              tagline="Gumawa ng maayos at malinaw na commit history"
              description="Gumawa ng bagong repo para sa isang todo app. Mag-commit ng exactly 5 files gamit ang tamang Conventional Commits format — feat:, style:, docs:, fix:, at chore: — tig-isa bawat isa."
              skills={['git init', 'git add', 'git commit', 'conventional commits']}
              terminalLink="/lessons/practice/2"
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={3}
              icon={GitBranch}
              level="beginner"
              title="Branch Juggler"
              tagline="Mag-manage ng tatlong branches nang sabay-sabay"
              description="Gumawa ng repo na may main branch. Mula doon, gumawa ng 3 feature branches, mag-commit ng iba-ibang files sa bawat isa, at i-merge ang lahat pabalik sa main nang walang conflicts."
              skills={['git branch', 'git switch', 'git merge', 'git log --graph']}
              terminalLink="/lessons/practice/3"
            />
            <ChallengeCard
              num={4}
              icon={RefreshCw}
              level="beginner"
              title="Undo Master"
              tagline="I-undo ang mga pagkakamali nang tama"
              description="Gumawa ng 5 commits sa isang repo. Pagkatapos: (1) i-undo ang pinakabago gamit ang git revert, (2) i-unstage ang isang file gamit ang git restore, (3) i-amend ang commit message ng huli."
              skills={['git revert', 'git restore', 'git commit --amend', 'git reset']}
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={13}
              icon={Shield}
              level="beginner"
              title="gitignore Guardian"
              tagline="Protektahan ang repo mula sa hindi dapat i-track na files"
              description="Gumawa ng Node.js project na may node_modules/, .env, at dist/ folder. I-set up ang tamang .gitignore para hindi ma-commit ang mga ito. I-verify gamit ang git status at git check-ignore."
              skills={['.gitignore', 'git check-ignore', 'git rm --cached', 'git status']}
            />
            <ChallengeCard
              num={14}
              icon={Layers}
              level="beginner"
              title="Log Explorer"
              tagline="Master ang iba't ibang paraan ng pagtingin sa Git history"
              description="Sa isang repo na may 10+ commits, gamitin ang git log sa 5 iba't ibang paraan: --oneline, --graph --all, --author, --since='1 week ago', at --format='%h %s'. I-document ang output ng bawat isa."
              skills={['git log --oneline', 'git log --graph', 'git log --author', 'git log --format']}
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={15}
              icon={GitPullRequest}
              level="beginner"
              title="First Pull Request"
              tagline="Kumpletuhin ang buong PR workflow mula umpisa hanggang merge"
              description="I-fork ang isang sample repo sa GitHub, i-clone locally, gumawa ng feature branch, mag-commit ng change, i-push, at i-open ang Pull Request. Sagutin ang code review comment bago i-merge."
              skills={['git fork', 'git clone', 'git push -u', 'pull request', 'code review']}
            />
            <ChallengeCard
              num={16}
              icon={Wrench}
              level="beginner"
              title="Git Alias Speedrun"
              tagline="I-customize ang Git para mas mabilis ang iyong workflow"
              description="I-set up ang 5 Git aliases: st para sa status, co para sa checkout, br para sa branch, lg para sa log --oneline --graph, at unstage para sa restore --staged. Gamitin ang lahat ng 5 sa isang session."
              skills={['git config --global alias', 'git aliases', '.gitconfig']}
            />
          </div>
        </section>

        {/* ── Intermediate Challenges ── */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionHeader
            Icon={Zap}
            title="Intermediate Challenges"
            subtitle="Para sa mga komportable na sa basics — palaimin ang workflow"
            color={DIFF.intermediate.color}
          />

          <div className="lesson-cards-row">
            <ChallengeCard
              num={5}
              icon={GitMerge}
              level="intermediate"
              title="Conflict Resolver"
              tagline="Ayusin ang 3 merge conflicts nang sunod-sunod"
              description="Gumawa ng dalawang branches na parehong nagbago ng styles.css, index.html, at script.js. I-merge ang dalawa at resolbahin ang tatlong conflicts. Ang final code ay dapat gumana nang maayos."
              skills={['git merge', 'conflict markers', 'git add', 'git commit']}
              terminalLink="/lessons/practice/5"
            />
            <ChallengeCard
              num={6}
              icon={Search}
              level="intermediate"
              title="Remote Ranger"
              tagline="Master ang remote repository workflows"
              description="I-fork ang isang public repo, i-clone ito, i-add ang original bilang upstream, mag-fetch ng latest changes, gumawa ng feature branch, at i-push para sa Pull Request. Complete open source flow."
              skills={['git remote', 'git fetch', 'git push', 'git pull', 'upstream']}
              terminalLink="/lessons/practice/7"
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={7}
              icon={Target}
              level="intermediate"
              title="Tag & Release"
              tagline="I-set up ang proper semantic versioning"
              description="Gumawa ng repo na may 5+ commits. I-create ang v1.0.0 at v1.1.0 tags — isa lightweight, isa annotated. I-push ang lahat ng tags sa remote at alamin ang difference ng dalawa."
              skills={['git tag', 'git tag -a', 'git push --tags', 'semantic versioning']}
              terminalLink="/lessons/practice/6"
            />
            <ChallengeCard
              num={8}
              icon={Lightbulb}
              level="intermediate"
              title="Stash Wizard"
              tagline="Mag-juggle ng multiple work-in-progress"
              description="Habang nag-wowork sa isang feature, may dumating na urgent bug fix. Gamitin ang git stash para i-save ang WIP work, mag-switch, i-fix ang bug, at i-restore ang original work nang tama."
              skills={['git stash', 'git stash pop', 'git stash list', 'git stash apply']}
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={17}
              icon={Scissors}
              level="intermediate"
              title="Cherry Picker"
              tagline="Kunin lang ang commits na kailangan mo"
              description="May develop branch na may 6 commits. Ang main branch ay kailangan lang ng 2 specific commits — hindi lahat. Gamitin ang git cherry-pick para ilipat ang exact commits na gusto mo nang hindi nag-me-merge ng buong branch."
              skills={['git cherry-pick', 'git cherry-pick -n', 'git log', 'commit hashes']}
            />
            <ChallengeCard
              num={18}
              icon={Code}
              level="intermediate"
              title="Diff Detective"
              tagline="Pag-aralan ang changes sa iba't ibang paraan"
              description="Sa isang repo na may maraming branches at staged/unstaged changes, gamitin ang git diff sa 4 scenarios: working tree vs staged, staged vs last commit, between two branches, at between two commits. Intindihin ang output ng bawat isa."
              skills={['git diff', 'git diff --staged', 'git diff branch1..branch2', 'git diff HEAD~2']}
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={19}
              icon={Network}
              level="intermediate"
              title="Git Hooks Setup"
              tagline="I-automate ang validation gamit ang Git hooks"
              description="I-create ang dalawang Git hooks: (1) pre-commit hook na nag-re-reject ng commit kung may trailing whitespace sa files, (2) commit-msg hook na nag-e-enforce ng Conventional Commits format. I-test ang pareho sa valid at invalid na commits."
              skills={['git hooks', 'pre-commit', 'commit-msg', '.git/hooks', 'bash scripting']}
            />
            <ChallengeCard
              num={20}
              icon={GitMerge}
              level="intermediate"
              title="Merge Strategies"
              tagline="Alamin ang pagkakaiba ng merge, squash, at rebase"
              description="Gumawa ng tatlong magkaparehong branches. I-integrate ang una gamit ang regular merge, ang ikalawa gamit ang --squash, at ang ikatlo gamit ang rebase. Tingnan ang git log --graph pagkatapos ng bawat isa at intindihin kung bakit iba ang history."
              skills={['git merge', 'git merge --squash', 'git rebase', 'merge strategies']}
            />
          </div>
        </section>

        {/* ── Advanced Challenges ── */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionHeader
            Icon={Flame}
            title="Advanced Challenges"
            subtitle="Para sa mga seryoso — ito ang gagamitin mo sa professional teams"
            color={DIFF.advanced.color}
          />

          <div className="lesson-cards-row">
            <ChallengeCard
              num={9}
              icon={Search}
              level="advanced"
              title="Bug Bisect Hunt"
              tagline="Hanapin ang exact commit na nag-break ng app"
              description="May repo na may 20 commits — isa sa mga ito ang nag-introduce ng isang bug. Gamitin ang git bisect para ma-pinpoint ang exact commit na may problema gamit ang binary search. Goal: less than 6 steps."
              skills={['git bisect', 'git bisect start', 'git bisect good/bad', 'git bisect reset']}
            />
            <ChallengeCard
              num={10}
              icon={GitBranch}
              level="advanced"
              title="Git Flow Pro"
              tagline="Implement ang buong Git Flow sa isang project lifecycle"
              description="Set up ang proper Git Flow para sa isang app: main, develop, feature/*, release/*, hotfix/* branches. Simulate ang buong lifecycle mula sa feature development hanggang sa production release."
              skills={['git flow', 'release branches', 'hotfix', 'tagging', 'merge strategy']}
              terminalLink="/lessons/practice/8"
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={11}
              icon={Terminal}
              level="advanced"
              title="CI/CD Pipeline Builder"
              tagline="I-automate ang testing gamit ang GitHub Actions"
              description="Gumawa ng GitHub Actions workflow na: (1) nag-ru-run ng tests sa bawat PR, (2) nag-de-deploy sa staging kapag nag-merge sa develop, (3) nag-re-release sa production kapag nag-push ng tag."
              skills={['GitHub Actions', 'YAML', 'workflow triggers', 'environment secrets']}
              terminalLink="/lessons/practice/9"
            />
            <ChallengeCard
              num={12}
              icon={GitMerge}
              level="advanced"
              title="Interactive Rebase"
              tagline="Rewrite history para sa clean Pull Requests"
              description="May feature branch na may 8 messy commits — typos, 'WIP' messages, at duplicate work. Gamitin ang git rebase -i para i-squash, reorder, at reword ang commits para maging 3 malinaw na commits."
              skills={['git rebase -i', 'squash', 'reword', 'fixup', 'force push']}
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={21}
              icon={Package}
              level="advanced"
              title="Monorepo Architect"
              tagline="I-set up ang isang production-ready monorepo"
              description="Gumawa ng monorepo na may 3 packages: frontend/, backend/, at shared/. I-set up ang tamang .gitignore para sa bawat package type, gumawa ng root-level package.json na may workspaces, at mag-commit gamit ang scoped conventional commits — e.g. feat(frontend):, fix(api):."
              skills={['monorepo', 'workspaces', 'scoped commits', '.gitignore patterns', 'git log --all']}
            />
            <ChallengeCard
              num={22}
              icon={GitFork}
              level="advanced"
              title="Worktree Warrior"
              tagline="Mag-work sa maraming branches nang sabay-sabay"
              description="May critical hotfix na kailangan i-deploy habang nasa kalagitnaan ka ng isang malaking feature. Gamitin ang git worktree para mag-checkout ng hotfix branch sa ibang folder nang hindi inaaalis ang iyong current work. I-fix, i-merge, at i-cleanup ang worktree."
              skills={['git worktree add', 'git worktree list', 'git worktree remove', 'parallel branches']}
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={23}
              icon={Archive}
              level="advanced"
              title="Patch & Apply"
              tagline="I-share ang changes nang walang remote repository"
              description="Mag-generate ng patch file mula sa 3 commits gamit ang git format-patch. I-send (simulate) ang patch sa ibang developer. I-apply ang patch sa isang bagong clone gamit ang git am. I-verify na tama ang lahat ng commits at messages."
              skills={['git format-patch', 'git am', 'git apply', 'git bundle']}
            />
            <ChallengeCard
              num={24}
              icon={Search}
              level="advanced"
              title="Submodule Manager"
              tagline="I-manage ang external dependencies bilang Git submodules"
              description="I-add ang isang external library bilang git submodule sa iyong project. I-clone ang parent repo kasama ang submodule gamit ang --recurse-submodules. I-update ang submodule sa pinakabagong version at i-commit ang pointer update sa parent repo."
              skills={['git submodule add', 'git submodule update', '--recurse-submodules', 'submodule init']}
              isLocked
            />
          </div>
          <div className="lesson-cards-row">
            <ChallengeCard
              num={25}
              icon={Shield}
              level="advanced"
              title="Signed Commits"
              tagline="I-verify ang authenticity ng iyong commits gamit ang GPG"
              description="I-set up ang GPG key signing para sa iyong Git commits. I-configure ang Git para laging mag-sign ng commits at tags. I-verify ang signature gamit ang git verify-commit at git verify-tag. Tingnan kung paano ito nagpapakita sa GitHub bilang 'Verified'."
              skills={['GPG signing', 'git commit -S', 'git verify-commit', 'git config gpg.program']}
              isLocked
            />
            <ChallengeCard
              num={26}
              icon={RefreshCw}
              level="advanced"
              title="Reflog Rescue"
              tagline="I-recover ang 'nawalang' commits gamit ang git reflog"
              description="Sadyang i-delete ang isang branch na may 3 important commits. Gamitin ang git reflog para mahanap ang commit hash ng deleted branch tip. I-recover ang lahat ng commits sa isang bagong branch at i-verify na kumpleto ang lahat ng data."
              skills={['git reflog', 'git checkout -b', 'git reset --hard', 'commit recovery']}
            />
          </div>
        </section>

        {/* ── Tip box ── */}
        <div style={{
          background: 'var(--bg-tip)', border: '1px solid var(--accent-dim)',
          borderRadius: 12, padding: '20px 24px',
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <Lightbulb size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
              Pro Tip: Gawin mo sa Tunay na Terminal
            </span>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
              Ang simulator ay para sa practice, pero para sa tunay na mastery, gawin mo ang mga
              challenges sa iyong actual na computer gamit ang real Git at GitHub. Ang muscle memory
              na mabubuo mo doon ay mas mananatili sa isip mo.
            </p>
          </div>
        </div>

        {/* ── Warning: Interactive Rebase ── */}
        <div style={{
          background: 'var(--bg-warning)', border: '1px solid var(--border-warning)',
          borderRadius: 12, padding: '20px 24px',
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <AlertTriangle size={20} style={{ color: 'var(--text-warning)', flexShrink: 0, marginTop: 2 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ ...sans, fontSize: 14, fontWeight: 700, color: 'var(--text-warning)' }}>
              Babala sa Advanced Challenges
            </span>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
              Ang{' '}
              <code style={{ ...mono, fontSize: 13, color: 'var(--text-warning)', background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: 4 }}>git rebase -i</code>
              {' '}at{' '}
              <code style={{ ...mono, fontSize: 13, color: 'var(--text-warning)', background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: 4 }}>git bisect</code>
              {' '}ay powerful na commands na nagbabago ng Git history. Huwag gamitin ang rebase sa shared branches
              (main, develop) — sa feature branches mo lang para maiwasang ma-overwrite ang trabaho ng iyong teammates.
            </p>
          </div>
        </div>

        {/* ── Next steps ── */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)', borderRadius: 14,
          padding: '28px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Target size={20} style={{ color: 'var(--accent)' }} />
              <h2 style={{ ...sans, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Simulan sa Practice Projects
              </h2>
            </div>
            <p style={{ ...sans, fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
              Hindi ka pa handa sa challenges? I-practice muna ang mga fundamentals sa aming
              step-by-step interactive terminal simulator.
            </p>
          </div>
          <a
            href="/lessons/practice"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 8,
              background: 'var(--accent)', color: '#fff',
              ...sans, fontSize: 14, fontWeight: 700,
              textDecoration: 'none', flexShrink: 0,
            }}
          >
            Go to Practice Projects <ChevronRight size={15} />
          </a>
        </div>

      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
