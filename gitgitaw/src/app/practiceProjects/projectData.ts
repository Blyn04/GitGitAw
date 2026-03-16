// ── Helpers ────────────────────────────────────────────────────────────────

const n = (s: string) => s.trim().replace(/\s+/g, ' ')

const exact = (e: string) => (s: string) => n(s) === e
const startsWith = (p: string) => (s: string) => n(s).startsWith(p)
const anyOf = (...fns: Array<(s: string) => boolean>) => (s: string) => fns.some(f => f(s))

function commitMsg(input: string): string {
  const m = input.match(/git commit[^"']*["']([^"']+)["']/)
  return m ? m[1].trim() : ''
}

// Accept "git commit -m '...' " or 'git commit -m "..."' where msg starts with type
const commitType = (type: string) => (s: string) => {
  const msg = commitMsg(s)
  return msg.startsWith(type + ':') || msg.startsWith(type + '(')
}

const anyCommit = (s: string) => n(s).startsWith('git commit -m')

// ── Types ──────────────────────────────────────────────────────────────────

export interface ProjectStep {
  instruction: string
  detail?: string
  hint: string
  windowsHint?: string
  check: (cmd: string) => boolean
  output: string
  successMsg: string
  newDir?: string
}

export interface ProjectConfig {
  id: number
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  difficultyColor: string
  difficultyBg: string
  initialDir: string
  steps: ProjectStep[]
}

// ── Project data ───────────────────────────────────────────────────────────

export const PROJECTS: ProjectConfig[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 1 — Ang Aking Unang Repo
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Ang Aking Unang Repo',
    description: 'Gumawa ng personal repository mula sa simula. Basic Git workflow para sa personal projects.',
    difficulty: 'Beginner',
    difficultyColor: '#3fb950',
    difficultyBg: '#1a3a1a',
    initialDir: '~',
    steps: [
      {
        instruction: 'Gumawa ng bagong folder para sa iyong project.',
        detail: 'Ang `mkdir` command ay gumagawa ng bagong directory.',
        hint: 'mkdir my-first-repo',
        check: anyOf(
          exact('mkdir my-first-repo'),
          startsWith('mkdir my-first-repo'),
        ),
        output: '',
        successMsg: 'Folder created!',
        newDir: '~',
      },
      {
        instruction: 'Pumunta sa loob ng bagong folder.',
        detail: '`cd` (change directory) ang ginagamit para mag-navigate sa folders.',
        hint: 'cd my-first-repo',
        check: anyOf(exact('cd my-first-repo'), startsWith('cd my-first-repo')),
        output: '',
        successMsg: "Nandito ka na sa ~/my-first-repo!",
        newDir: '~/my-first-repo',
      },
      {
        instruction: 'I-initialize ang Git sa folder na ito.',
        detail: '`git init` ay gumagawa ng bagong `.git/` folder — dito naka-save ang lahat ng Git history.',
        hint: 'git init',
        check: exact('git init'),
        output: 'Initialized empty Git repository in ~/my-first-repo/.git/',
        successMsg: 'Git repository initialized!',
      },
      {
        instruction: 'Gumawa ng README.md file.',
        detail: 'Ang README.md ang unang makikita ng mga bisita sa iyong repo sa GitHub.',
        hint: 'touch README.md',
        windowsHint: 'New-Item README.md',
        check: anyOf(
          exact('touch README.md'),
          startsWith('echo'),
          startsWith('cat >'),
          startsWith('New-Item'),
          startsWith('new-item'),
          startsWith('ni '),
        ),
        output: '',
        successMsg: 'README.md created!',
      },
      {
        instruction: 'I-stage ang README.md para sa commit.',
        detail: '`git add` ay naglalagay ng files sa staging area — parang "listahan" ng mga icco-commit.',
        hint: 'git add README.md',
        check: anyOf(
          exact('git add README.md'),
          exact('git add .'),
          exact('git add -A'),
        ),
        output: '',
        successMsg: 'README.md staged!',
      },
      {
        instruction: 'Gumawa ng unang commit gamit ang Conventional Commits format.',
        detail: 'Gamitin ang `feat:` type dahil nagdadagdag tayo ng bagong file.',
        hint: 'git commit -m "feat: add personal README"',
        check: anyOf(commitType('feat'), anyCommit),
        output: '[main (root-commit) a1b2c3d] feat: add personal README\n 1 file changed, 3 insertions(+)\n create mode 100644 README.md',
        successMsg: 'First commit done!',
      },
      {
        instruction: 'I-connect ang local repo sa GitHub.',
        detail: 'Palitan ang `username` at `repo-name` ng iyong actual GitHub username at repo name.',
        hint: 'git remote add origin https://github.com/username/my-first-repo.git',
        check: startsWith('git remote add origin'),
        output: '',
        successMsg: 'Remote origin added!',
      },
      {
        instruction: 'I-rename ang branch sa `main`.',
        detail: 'Ang convention ngayon ay `main` ang default branch name.',
        hint: 'git branch -M main',
        check: anyOf(exact('git branch -M main'), exact('git branch -m main')),
        output: '',
        successMsg: 'Branch renamed to main!',
      },
      {
        instruction: 'I-push ang code sa GitHub!',
        detail: '`-u origin main` ay nag-se-set ng upstream para sa future pushes.',
        hint: 'git push -u origin main',
        check: anyOf(
          exact('git push -u origin main'),
          exact('git push origin main'),
          startsWith('git push'),
        ),
        output: 'Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 234 bytes | 234.00 KiB/s, done.\nTo https://github.com/username/my-first-repo.git\n * [new branch]      main -> main\nBranch main set up to track remote branch main from origin.',
        successMsg: 'Code is now on GitHub! 🎉',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 2 — Commit History Practice
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'Commit History Practice',
    description: 'Matuto kung paano gumawa ng maayos na commit history gamit ang Conventional Commits.',
    difficulty: 'Beginner',
    difficultyColor: '#3fb950',
    difficultyBg: '#1a3a1a',
    initialDir: '~/todo-starter',
    steps: [
      {
        instruction: 'Gumawa ng bagong feature branch.',
        detail: 'Laging gumawa ng branch para sa bawat feature — huwag direktang mag-work sa main.',
        hint: 'git switch -c feature/todo-app',
        check: anyOf(
          exact('git switch -c feature/todo-app'),
          exact('git checkout -b feature/todo-app'),
          startsWith('git switch -c feature/'),
          startsWith('git checkout -b feature/'),
        ),
        output: "Switched to a new branch 'feature/todo-app'",
        successMsg: 'Feature branch created!',
      },
      {
        instruction: 'I-stage ang index.html — ang HTML structure ng app.',
        hint: 'git add index.html',
        check: anyOf(exact('git add index.html'), exact('git add .')),
        output: '',
        successMsg: 'index.html staged!',
      },
      {
        instruction: 'I-commit ang HTML file. Gamitin ang `feat:` type.',
        detail: 'Conventional: `feat:` para sa bagong functionality.',
        hint: 'git commit -m "feat: add basic HTML structure"',
        check: commitType('feat'),
        output: "[feature/todo-app b2c3d4e] feat: add basic HTML structure\n 1 file changed, 22 insertions(+)\n create mode 100644 index.html",
        successMsg: 'feat commit done!',
      },
      {
        instruction: 'I-stage ang styles.css.',
        hint: 'git add styles.css',
        check: anyOf(exact('git add styles.css'), exact('git add .')),
        output: '',
        successMsg: 'styles.css staged!',
      },
      {
        instruction: 'I-commit ang CSS. Gamitin ang `style:` type para sa styling changes.',
        detail: 'Ang `style:` type ay para sa CSS / formatting — walang logic change.',
        hint: 'git commit -m "style: add base styling"',
        check: commitType('style'),
        output: "[feature/todo-app c3d4e5f] style: add base styling\n 1 file changed, 48 insertions(+)\n create mode 100644 styles.css",
        successMsg: 'style commit done!',
      },
      {
        instruction: 'I-stage ang script.js.',
        hint: 'git add script.js',
        check: anyOf(exact('git add script.js'), exact('git add .')),
        output: '',
        successMsg: 'script.js staged!',
      },
      {
        instruction: 'I-commit ang JavaScript. Gamitin ang `feat:` type.',
        hint: 'git commit -m "feat: add task functionality"',
        check: commitType('feat'),
        output: "[feature/todo-app d4e5f6g] feat: add task functionality\n 1 file changed, 67 insertions(+)\n create mode 100644 script.js",
        successMsg: 'feat commit done!',
      },
      {
        instruction: 'Tignan ang commit history gamit ang oneline format.',
        detail: '`--oneline` ay nagpapakita ng compact na bawat commit sa isang linya.',
        hint: 'git log --oneline',
        check: anyOf(
          exact('git log --oneline'),
          exact('git log --oneline --graph'),
          startsWith('git log'),
        ),
        output: 'd4e5f6g (HEAD -> feature/todo-app) feat: add task functionality\nc3d4e5f style: add base styling\nb2c3d4e feat: add basic HTML structure',
        successMsg: 'Malinaw ang commit history! 🎉',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 3 — Branch at Merge
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'Branch at Merge',
    description: 'I-practice ang branching workflow na karaniwang ginagamit sa team development.',
    difficulty: 'Beginner',
    difficultyColor: '#3fb950',
    difficultyBg: '#1a3a1a',
    initialDir: '~/portfolio',
    steps: [
      {
        instruction: 'Gumawa ng branch para sa header section ng portfolio.',
        hint: 'git switch -c feature/header',
        check: anyOf(
          exact('git switch -c feature/header'),
          exact('git checkout -b feature/header'),
        ),
        output: "Switched to a new branch 'feature/header'",
        successMsg: 'Branch feature/header created!',
      },
      {
        instruction: 'I-stage ang lahat ng changes sa header.',
        hint: 'git add .',
        check: anyOf(exact('git add .'), exact('git add -A'), startsWith('git add')),
        output: '',
        successMsg: 'Changes staged!',
      },
      {
        instruction: 'I-commit ang header. Gamitin ang `feat:` type.',
        hint: 'git commit -m "feat: add portfolio header"',
        check: commitType('feat'),
        output: "[feature/header e5f6g7h] feat: add portfolio header\n 1 file changed, 18 insertions(+)",
        successMsg: 'Header committed!',
      },
      {
        instruction: 'Bumalik sa main branch.',
        detail: 'Palaging bumalik sa main bago mag-merge.',
        hint: 'git switch main',
        check: anyOf(exact('git switch main'), exact('git checkout main')),
        output: "Switched to branch 'main'",
        successMsg: 'Back on main!',
      },
      {
        instruction: 'I-merge ang feature/header branch papunta sa main.',
        hint: 'git merge feature/header',
        check: exact('git merge feature/header'),
        output: "Updating a1b2c3d..e5f6g7h\nFast-forward\n index.html | 18 ++++++++++++++++++\n 1 file changed, 18 insertions(+)",
        successMsg: 'Header merged to main!',
      },
      {
        instruction: 'Gumawa ng bagong branch para sa about section.',
        hint: 'git switch -c feature/about',
        check: anyOf(
          exact('git switch -c feature/about'),
          exact('git checkout -b feature/about'),
        ),
        output: "Switched to a new branch 'feature/about'",
        successMsg: 'Branch feature/about created!',
      },
      {
        instruction: 'I-stage at i-commit ang about section.',
        detail: 'Pwede mong i-stage first (`git add .`) then commit.',
        hint: 'git add .',
        check: anyOf(exact('git add .'), exact('git add -A'), startsWith('git add')),
        output: '',
        successMsg: 'Changes staged!',
      },
      {
        instruction: 'I-commit ang about section.',
        hint: 'git commit -m "feat: add about section"',
        check: commitType('feat'),
        output: "[feature/about f6g7h8i] feat: add about section\n 1 file changed, 24 insertions(+)",
        successMsg: 'About committed!',
      },
      {
        instruction: 'Bumalik sa main at i-merge ang feature/about.',
        detail: 'Dalawang commands: `git switch main` then `git merge feature/about`.',
        hint: 'git switch main',
        check: anyOf(exact('git switch main'), exact('git checkout main')),
        output: "Switched to branch 'main'",
        successMsg: 'Back on main!',
      },
      {
        instruction: 'I-merge ang feature/about.',
        hint: 'git merge feature/about',
        check: exact('git merge feature/about'),
        output: "Updating e5f6g7h..f6g7h8i\nFast-forward\n index.html | 24 ++++++++++++++++++++++++\n 1 file changed, 24 insertions(+)",
        successMsg: 'About merged! Portfolio complete! 🎉',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 4 — Fake Collaboration Simulation
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'Fake Collaboration Simulation',
    description: 'I-simulate ang team collaboration gamit ang Pull Requests at code review workflow.',
    difficulty: 'Intermediate',
    difficultyColor: '#58a6ff',
    difficultyBg: '#1a2040',
    initialDir: '~/team-project',
    steps: [
      {
        instruction: 'Gumawa ng feature branch para sa login page.',
        hint: 'git switch -c feature/login',
        check: anyOf(startsWith('git switch -c feature/'), startsWith('git checkout -b feature/')),
        output: "Switched to a new branch 'feature/login'",
        successMsg: 'Feature branch created!',
      },
      {
        instruction: 'I-stage ang lahat ng iyong changes.',
        hint: 'git add .',
        check: anyOf(exact('git add .'), exact('git add -A'), startsWith('git add')),
        output: '',
        successMsg: 'Changes staged!',
      },
      {
        instruction: 'I-commit ang feature gamit ang Conventional Commits format.',
        detail: 'Ang malinaw na commit message ay mahalaga para sa code review.',
        hint: 'git commit -m "feat: add login form with validation"',
        check: anyOf(commitType('feat'), commitType('fix'), anyCommit),
        output: "[feature/login g7h8i9j] feat: add login form with validation\n 3 files changed, 87 insertions(+)",
        successMsg: 'Changes committed!',
      },
      {
        instruction: 'I-push ang feature branch sa remote repository.',
        detail: 'Kailangan mong i-push ang branch bago ka makagawa ng Pull Request sa GitHub.',
        hint: 'git push origin feature/login',
        check: anyOf(startsWith('git push origin feature/'), startsWith('git push')),
        output: "Enumerating objects: 6, done.\nCounting objects: 100% (6/6), done.\nTo https://github.com/team/project.git\n * [new branch]      feature/login -> feature/login",
        successMsg: 'Branch pushed to remote!',
      },
      {
        instruction: 'Bumalik sa main at i-pull ang pinakabagong changes.',
        detail: 'Palaging mag-pull muna bago mag-merge para maiwasan ang conflicts.',
        hint: 'git switch main',
        check: anyOf(exact('git switch main'), exact('git checkout main')),
        output: "Switched to branch 'main'\nYour branch is up to date with 'origin/main'.",
        successMsg: 'Back on main!',
      },
      {
        instruction: 'I-pull ang pinakabagong changes mula sa remote.',
        hint: 'git pull origin main',
        check: anyOf(exact('git pull origin main'), exact('git pull'), startsWith('git pull')),
        output: "Already up to date.",
        successMsg: 'Up to date!',
      },
      {
        instruction: 'I-merge ang feature/login branch pagkatapos ng code review.',
        hint: 'git merge feature/login',
        check: startsWith('git merge feature/'),
        output: "Updating a1b2c3d..g7h8i9j\nFast-forward\n login.html | 45 +++++++++++++++++++++++++++++++++++++++++++++\n 3 files changed, 87 insertions(+)",
        successMsg: 'Feature merged! Collaboration workflow complete! 🎉',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 5 — Intentional Conflict Resolution
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Intentional Conflict Resolution',
    description: 'Gumawa ng intentional merge conflicts at matutunan kung paano ito ayusin.',
    difficulty: 'Intermediate',
    difficultyColor: '#58a6ff',
    difficultyBg: '#1a2040',
    initialDir: '~/conflict-practice',
    steps: [
      {
        instruction: 'Gumawa ng branch-a — ito ang unang branch na magbabago ng parehong file.',
        hint: 'git switch -c branch-a',
        check: anyOf(exact('git switch -c branch-a'), exact('git checkout -b branch-a')),
        output: "Switched to a new branch 'branch-a'",
        successMsg: 'branch-a created!',
      },
      {
        instruction: 'I-commit ang changes sa branch-a (nag-edit ng header color).',
        detail: 'Imagine na binago mo ang `color: red` sa styles.css.',
        hint: 'git commit -m "feat: update header to red"',
        check: anyOf(commitType('feat'), anyCommit),
        output: "[branch-a h8i9j0k] feat: update header to red\n 1 file changed, 1 insertion(+), 1 deletion(-)",
        successMsg: 'branch-a committed!',
      },
      {
        instruction: 'Bumalik sa main para gumawa ng pangalawang conflicting branch.',
        hint: 'git switch main',
        check: anyOf(exact('git switch main'), exact('git checkout main')),
        output: "Switched to branch 'main'",
        successMsg: 'Back on main!',
      },
      {
        instruction: 'Gumawa ng branch-b — ito ang magco-conflict sa branch-a.',
        hint: 'git switch -c branch-b',
        check: anyOf(exact('git switch -c branch-b'), exact('git checkout -b branch-b')),
        output: "Switched to a new branch 'branch-b'",
        successMsg: 'branch-b created!',
      },
      {
        instruction: 'I-commit ang conflicting change (nag-edit din ng parehong header color).',
        detail: 'Binago mo ang parehong linya — `color: blue` sa styles.css.',
        hint: 'git commit -m "feat: update header to blue"',
        check: anyOf(commitType('feat'), anyCommit),
        output: "[branch-b i9j0k1l] feat: update header to blue\n 1 file changed, 1 insertion(+), 1 deletion(-)",
        successMsg: 'branch-b committed!',
      },
      {
        instruction: 'Bumalik sa main at i-merge ang branch-a (walang conflict pa ito).',
        hint: 'git switch main',
        check: anyOf(exact('git switch main'), exact('git checkout main')),
        output: "Switched to branch 'main'",
        successMsg: 'Back on main!',
      },
      {
        instruction: 'I-merge ang branch-a.',
        hint: 'git merge branch-a',
        check: exact('git merge branch-a'),
        output: "Updating a1b2c3d..h8i9j0k\nFast-forward\n styles.css | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
        successMsg: 'branch-a merged cleanly!',
      },
      {
        instruction: 'I-merge ang branch-b — magkakaroon ng CONFLICT dito!',
        detail: 'Huwag matakot sa conflicts — normal ito sa team development.',
        hint: 'git merge branch-b',
        check: exact('git merge branch-b'),
        output: "Auto-merging styles.css\nCONFLICT (content): Merge conflict in styles.css\nAutomatic merge failed; fix conflicts and then commit the result.\n\n>>> Sa totoong scenario, i-edit mo ang file at tanggalin ang conflict markers.\n>>> Para sa simulation na ito, i-proceed na tayo sa resolution.",
        successMsg: 'Conflict detected! Normal lang ito.',
      },
      {
        instruction: 'I-stage ang resolved files pagkatapos ayusin ang conflict.',
        detail: 'Sa totoong scenario: i-edit ang file, tanggalin ang <<<<<<, =======, >>>>>>>.',
        hint: 'git add .',
        check: anyOf(exact('git add .'), exact('git add -A'), startsWith('git add')),
        output: '',
        successMsg: 'Resolved files staged!',
      },
      {
        instruction: 'I-commit ang merge resolution.',
        hint: 'git commit -m "fix: resolve merge conflict in styles"',
        check: anyOf(commitType('fix'), anyCommit),
        output: "[main j0k1l2m] fix: resolve merge conflict in styles\n Merge made by the 'recursive' strategy.\n styles.css | 1 +\n 1 file changed, 1 insertion(+)",
        successMsg: 'Conflict resolved and committed! 🎉',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 6 — Versioning with Tags
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'Versioning with Tags',
    description: 'Matuto kung paano gumamit ng Git tags para mag-manage ng semantic versioning.',
    difficulty: 'Intermediate',
    difficultyColor: '#58a6ff',
    difficultyBg: '#1a2040',
    initialDir: '~/my-app',
    steps: [
      {
        instruction: 'Tignan ang commit history bago mag-tag.',
        hint: 'git log --oneline',
        check: anyOf(exact('git log --oneline'), startsWith('git log')),
        output: 'k1l2m3n (HEAD -> main) feat: complete v1 features\nj0k1l2m feat: add user auth\ni9j0k1l feat: add dashboard',
        successMsg: 'History reviewed!',
      },
      {
        instruction: 'Gumawa ng lightweight tag para sa v1.0.0.',
        detail: 'Ang lightweight tag ay simple na pointer sa isang commit.',
        hint: 'git tag v1.0.0',
        check: anyOf(exact('git tag v1.0.0'), startsWith('git tag v')),
        output: '',
        successMsg: 'Tag v1.0.0 created!',
      },
      {
        instruction: 'Gumawa ng annotated tag para sa v1.1.0 (mas recommended ito).',
        detail: 'Ang annotated tag ay may message, tagger info, at timestamp.',
        hint: 'git tag -a v1.1.0 -m "Release v1.1.0"',
        check: (s) => n(s).startsWith('git tag -a') && n(s).includes('-m'),
        output: '',
        successMsg: 'Annotated tag v1.1.0 created!',
      },
      {
        instruction: 'Listahan ang lahat ng tags.',
        hint: 'git tag',
        check: anyOf(exact('git tag'), exact('git tag -l'), startsWith('git tag')),
        output: 'v1.0.0\nv1.1.0',
        successMsg: 'Tags listed!',
      },
      {
        instruction: 'I-push ang v1.0.0 tag sa remote.',
        hint: 'git push origin v1.0.0',
        check: anyOf(
          exact('git push origin v1.0.0'),
          exact('git push origin --tags'),
          startsWith('git push origin v'),
          startsWith('git push origin --tags'),
        ),
        output: "Enumerating objects: 1, done.\nTo https://github.com/username/my-app.git\n * [new tag]         v1.0.0 -> v1.0.0",
        successMsg: 'Tag pushed to remote!',
      },
      {
        instruction: 'I-push ang lahat ng tags sa remote.',
        hint: 'git push origin --tags',
        check: anyOf(
          exact('git push origin --tags'),
          exact('git push --tags'),
        ),
        output: "Enumerating objects: 2, done.\nTo https://github.com/username/my-app.git\n * [new tag]         v1.1.0 -> v1.1.0",
        successMsg: 'All tags pushed! Semantic versioning complete! 🎉',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 7 — Open Source Contribution Simulation
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    title: 'Open Source Contribution Simulation',
    description: 'I-simulate ang buong open source workflow: fork → clone → branch → PR.',
    difficulty: 'Advanced',
    difficultyColor: '#bc8cff',
    difficultyBg: '#2a1a40',
    initialDir: '~',
    steps: [
      {
        instruction: 'I-clone ang iyong fork ng open source project.',
        detail: 'Sa totoong scenario, mag-fork ka muna sa GitHub bago mag-clone.',
        hint: 'git clone https://github.com/youruser/open-source-project.git',
        check: startsWith('git clone'),
        output: "Cloning into 'open-source-project'...\nremote: Enumerating objects: 47, done.\nresolving deltas: 100% (12/12), done.",
        successMsg: 'Fork cloned!',
        newDir: '~/open-source-project',
      },
      {
        instruction: 'I-add ang original repo bilang `upstream` remote.',
        detail: 'Kailangan ito para ma-sync ang iyong fork sa original repo.',
        hint: 'git remote add upstream https://github.com/original/open-source-project.git',
        check: startsWith('git remote add upstream'),
        output: '',
        successMsg: 'Upstream remote added!',
      },
      {
        instruction: 'I-fetch ang latest changes mula sa upstream.',
        hint: 'git fetch upstream',
        check: anyOf(exact('git fetch upstream'), exact('git fetch')),
        output: "From https://github.com/original/open-source-project\n * [new branch]      main -> upstream/main",
        successMsg: 'Upstream fetched!',
      },
      {
        instruction: 'Gumawa ng descriptive branch para sa iyong contribution.',
        detail: 'Gumamit ng prefix na nagpapaliwanag ng uri ng change: `fix/`, `feat/`, `docs/`.',
        hint: 'git switch -c fix/typo-in-readme',
        check: anyOf(
          startsWith('git switch -c fix/'),
          startsWith('git switch -c feat/'),
          startsWith('git switch -c docs/'),
          startsWith('git checkout -b fix/'),
          startsWith('git checkout -b feat/'),
          startsWith('git checkout -b docs/'),
        ),
        output: "Switched to a new branch 'fix/typo-in-readme'",
        successMsg: 'Contribution branch created!',
      },
      {
        instruction: 'I-stage ang iyong changes.',
        hint: 'git add .',
        check: anyOf(exact('git add .'), startsWith('git add')),
        output: '',
        successMsg: 'Changes staged!',
      },
      {
        instruction: 'I-commit ang contribution gamit ang Conventional Commits.',
        detail: 'Maraming open source projects ay nag-require ng conventional commit messages.',
        hint: 'git commit -m "fix: correct typo in README introduction"',
        check: anyOf(commitType('fix'), commitType('feat'), commitType('docs'), anyCommit),
        output: "[fix/typo-in-readme l2m3n4o] fix: correct typo in README introduction\n 1 file changed, 1 insertion(+), 1 deletion(-)",
        successMsg: 'Contribution committed!',
      },
      {
        instruction: 'I-push ang branch sa iyong fork at magtayo ng PR!',
        detail: 'Pagkatapos ng push, pumunta sa GitHub para gumawa ng Pull Request.',
        hint: 'git push origin fix/typo-in-readme',
        check: anyOf(startsWith('git push origin fix/'), startsWith('git push origin feat/'), startsWith('git push')),
        output: "Enumerating objects: 5, done.\nTo https://github.com/youruser/open-source-project.git\n * [new branch]      fix/typo-in-readme -> fix/typo-in-readme\n\nCreate a pull request for 'fix/typo-in-readme' on GitHub by visiting:\nhttps://github.com/youruser/open-source-project/pull/new/fix/typo-in-readme",
        successMsg: 'Contribution pushed! Ready to open a PR! 🎉',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 8 — Git Flow Workflow
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 8,
    title: 'Git Flow Workflow',
    description: 'Gamitin ang Git Flow branching strategy sa isang full project lifecycle.',
    difficulty: 'Advanced',
    difficultyColor: '#bc8cff',
    difficultyBg: '#2a1a40',
    initialDir: '~/my-app',
    steps: [
      {
        instruction: 'Gumawa ng `develop` branch — ang integration branch ng Git Flow.',
        detail: 'Sa Git Flow: main = production, develop = integration/staging.',
        hint: 'git switch -c develop',
        check: anyOf(exact('git switch -c develop'), exact('git checkout -b develop')),
        output: "Switched to a new branch 'develop'",
        successMsg: 'develop branch created!',
      },
      {
        instruction: 'Mula sa develop, gumawa ng feature branch.',
        hint: 'git switch -c feature/user-dashboard',
        check: anyOf(startsWith('git switch -c feature/'), startsWith('git checkout -b feature/')),
        output: "Switched to a new branch 'feature/user-dashboard'",
        successMsg: 'Feature branch from develop!',
      },
      {
        instruction: 'I-commit ang feature work.',
        hint: 'git commit -m "feat: add user dashboard"',
        check: anyOf(commitType('feat'), anyCommit),
        output: "[feature/user-dashboard m3n4o5p] feat: add user dashboard\n 5 files changed, 124 insertions(+)",
        successMsg: 'Feature committed!',
      },
      {
        instruction: 'Bumalik sa develop at i-merge ang feature.',
        hint: 'git switch develop',
        check: anyOf(exact('git switch develop'), exact('git checkout develop')),
        output: "Switched to branch 'develop'",
        successMsg: 'Back on develop!',
      },
      {
        instruction: 'I-merge ang feature branch sa develop.',
        hint: 'git merge feature/user-dashboard',
        check: startsWith('git merge feature/'),
        output: "Updating n4o5p6q..m3n4o5p\nFast-forward\n 5 files changed, 124 insertions(+)",
        successMsg: 'Feature merged to develop!',
      },
      {
        instruction: 'Gumawa ng release branch para sa v1.0.0.',
        detail: 'Ang release branch ay para sa final testing at bug fixes bago i-deploy.',
        hint: 'git switch -c release/1.0.0',
        check: anyOf(startsWith('git switch -c release/'), startsWith('git checkout -b release/')),
        output: "Switched to a new branch 'release/1.0.0'",
        successMsg: 'Release branch created!',
      },
      {
        instruction: 'Bumalik sa main at i-merge ang release.',
        hint: 'git switch main',
        check: anyOf(exact('git switch main'), exact('git checkout main')),
        output: "Switched to branch 'main'",
        successMsg: 'Back on main!',
      },
      {
        instruction: 'I-merge ang release branch sa main (deployment!)',
        hint: 'git merge release/1.0.0',
        check: startsWith('git merge release/'),
        output: "Updating a1b2c3d..m3n4o5p\nFast-forward\n 5 files changed, 124 insertions(+)",
        successMsg: 'Release merged to main!',
      },
      {
        instruction: 'Tag ang release sa main.',
        hint: 'git tag v1.0.0',
        check: startsWith('git tag v'),
        output: '',
        successMsg: 'v1.0.0 tagged! Git Flow complete! 🎉',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 9 — GitHub Actions CI/CD
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 9,
    title: 'GitHub Actions CI/CD',
    description: 'Gumawa ng basic CI/CD pipeline gamit ang GitHub Actions para sa automated testing.',
    difficulty: 'Advanced',
    difficultyColor: '#bc8cff',
    difficultyBg: '#2a1a40',
    initialDir: '~/my-app',
    steps: [
      {
        instruction: 'Gumawa ng `.github/workflows` directory.',
        detail: 'Dito ilalagay ang YAML files ng GitHub Actions workflows.',
        hint: 'mkdir -p .github/workflows',
        windowsHint: 'New-Item -ItemType Directory -Force .github\\workflows',
        check: anyOf(
          exact('mkdir -p .github/workflows'),
          exact('mkdir .github'),
          startsWith('mkdir'),
          startsWith('New-Item'),
          startsWith('new-item'),
        ),
        output: '',
        successMsg: 'Workflows directory created!',
      },
      {
        instruction: 'Gumawa ng workflow YAML file.',
        detail: 'Ang workflow file ay nag-de-define ng kung kailan at paano mag-run ang CI.',
        hint: 'touch .github/workflows/ci.yml',
        windowsHint: 'New-Item .github\\workflows\\ci.yml',
        check: anyOf(
          startsWith('touch .github'),
          startsWith('echo'),
          startsWith('cat >'),
          startsWith('nano'),
          startsWith('vim'),
          startsWith('New-Item'),
          startsWith('new-item'),
          startsWith('ni '),
        ),
        output: '',
        successMsg: 'Workflow file created!',
      },
      {
        instruction: 'Suriin ang workflow file na ginawa mo.',
        detail: 'Dapat naglalaman ito ng: `on:`, `jobs:`, at `steps:` sections.',
        hint: 'cat .github/workflows/ci.yml',
        windowsHint: 'Get-Content .github\\workflows\\ci.yml',
        check: anyOf(
          startsWith('cat'),
          startsWith('less'),
          startsWith('more'),
          startsWith('Get-Content'),
          startsWith('get-content'),
          startsWith('type '),
        ),
        output: `name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test`,
        successMsg: 'Workflow file looks good!',
      },
      {
        instruction: 'I-stage ang `.github/` folder.',
        hint: 'git add .github/',
        check: anyOf(
          exact('git add .github/'),
          exact('git add .github'),
          exact('git add .'),
          startsWith('git add'),
        ),
        output: '',
        successMsg: '.github/ staged!',
      },
      {
        instruction: 'I-commit ang CI workflow gamit ang `ci:` type.',
        detail: 'Ang `ci:` commit type ay espesyal para sa CI/CD changes.',
        hint: 'git commit -m "ci: add automated testing workflow"',
        check: anyOf(commitType('ci'), commitType('feat'), anyCommit),
        output: "[main o5p6q7r] ci: add automated testing workflow\n 1 file changed, 18 insertions(+)\n create mode 100644 .github/workflows/ci.yml",
        successMsg: 'CI workflow committed!',
      },
      {
        instruction: 'I-push sa GitHub — magsisimula na ang GitHub Actions!',
        detail: 'Pagka-push, pumunta sa GitHub → Actions tab para makita ang workflow run.',
        hint: 'git push origin main',
        check: anyOf(startsWith('git push'), exact('git push')),
        output: "Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nTo https://github.com/username/my-app.git\n   a1b2c3d..o5p6q7r  main -> main\n\n✓ GitHub Actions triggered! Check the Actions tab on GitHub.\n  Running: CI workflow on ubuntu-latest...",
        successMsg: 'CI/CD pipeline is live! 🎉',
      },
    ],
  },
]

export function getProject(id: number): ProjectConfig | undefined {
  return PROJECTS.find(p => p.id === id)
}
