import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadSettings, type AppLanguage } from '../utils/settings'

const CHANGED = 'gitgitaw-settings-changed'

type LanguageContextValue = {
  language: AppLanguage
  refreshLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>(() => loadSettings().language)

  const refreshLanguage = useCallback(() => {
    setLanguage(loadSettings().language)
  }, [])

  useEffect(() => {
    const onStorage = () => refreshLanguage()
    window.addEventListener(CHANGED, refreshLanguage)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(CHANGED, refreshLanguage)
      window.removeEventListener('storage', onStorage)
    }
  }, [refreshLanguage])

  const value = useMemo(
    () => ({ language, refreshLanguage }),
    [language, refreshLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useAppLanguage(): AppLanguage {
  const ctx = useContext(LanguageContext)
  return ctx?.language ?? loadSettings().language
}

/** Call after saving settings so language updates in the same tab without relying only on events. */
export function useRefreshLanguage() {
  const ctx = useContext(LanguageContext)
  return ctx?.refreshLanguage ?? (() => {})
}
