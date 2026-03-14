import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { loadSettings, applySettings } from './utils/settings'
import AppLayout from './Components/layout/AppLayout'
import HomePage from './app/home/page'
import GetStarted from './app/gettingStarted/getStarted'
import BasicsPage from './app/basics/theBasics'
import SettingsPage from './app/settings/Settings'

// Apply persisted settings before first render
applySettings(loadSettings())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lessons/getting-started" element={<GetStarted />} />
          <Route path="lessons/the-basics"      element={<BasicsPage />} />
          <Route path="settings"                element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
