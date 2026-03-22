import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop'
import './index.css'
import { loadSettings, applySettings } from './utils/settings'
import AppLayout from './Components/layout/AppLayout'
import HomePage from './app/home/page'
import GetStarted from './app/gettingStarted/getStarted'
import BasicsPage from './app/basics/theBasics'
import BranchMerge from './app/branchingMerge/BranchMerge'
import GitHubEssentials from './app/githubEssentials/GitHubEssentials'
import Collaboration from './app/collaboration/Collaboration'
import MergeConflicts from './app/mergeConflicts/MergeConflicts'
import CheatSheet from './app/cheatSheet/CheatSheet'
import ConventionalCommits from './app/conventionalCommits/ConventionalCommits'
import PracticeProjects from './app/practiceProjects/PracticeProjects'
import ProjectPage from './app/practiceProjects/ProjectPage'
import SettingsPage from './app/settings/Settings'
import Challenges from './app/challenges/Challenges'

// Apply persisted settings before first render
applySettings(loadSettings())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lessons/getting-started" element={<GetStarted />} />
          <Route path="lessons/the-basics"      element={<BasicsPage />} />
          <Route path="lessons/branching-merging"  element={<BranchMerge />} />
          <Route path="lessons/github-essentials" element={<GitHubEssentials />} />
          <Route path="lessons/collaboration"     element={<Collaboration />} />
          <Route path="lessons/merge-conflicts"   element={<MergeConflicts />} />
          <Route path="lessons/cheat-sheet"          element={<CheatSheet />} />
          <Route path="lessons/conventional-commits" element={<ConventionalCommits />} />
          <Route path="lessons/practice"             element={<PracticeProjects />} />
          <Route path="lessons/practice/:projectId"  element={<ProjectPage />} />
          <Route path="lessons/challenges"             element={<Challenges />} />
          <Route path="settings"                     element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
