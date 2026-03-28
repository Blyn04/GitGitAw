import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import CommunityModal from '../app/community/CommunityModal'

type Ctx = { openCommunity: () => void; closeCommunity: () => void; isOpen: boolean }

const CommunityModalContext = createContext<Ctx | null>(null)

export function CommunityModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openCommunity = useCallback(() => setOpen(true), [])
  const closeCommunity = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ openCommunity, closeCommunity, isOpen: open }),
    [open, openCommunity, closeCommunity],
  )

  return (
    <CommunityModalContext.Provider value={value}>
      {children}
      <CommunityModal open={open} onClose={closeCommunity} />
    </CommunityModalContext.Provider>
  )
}

export function useCommunityModal(): Ctx {
  const ctx = useContext(CommunityModalContext)
  if (!ctx) {
    throw new Error('useCommunityModal must be used within CommunityModalProvider')
  }
  return ctx
}
