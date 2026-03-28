import { useEffect, useState } from 'react'
import { loadSettings, type AppLanguage } from '../utils/settings'

const CHANGED = 'gitgitaw-settings-changed'

export function useAppLanguage(): AppLanguage {
  const [lang, setLang] = useState<AppLanguage>(() => loadSettings().language)

  useEffect(() => {
    const refresh = () => setLang(loadSettings().language)
    window.addEventListener(CHANGED, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(CHANGED, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return lang
}
