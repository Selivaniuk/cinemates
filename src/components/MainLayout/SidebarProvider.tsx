'use client'

import { ReactNode, createContext, useMemo, useState } from 'react'

const SIDEBAR_OPEN_WIDTH = 311
const SIDEBAR_CLOSE_WIDTH = 73

interface ContextValue {
  sidebarWidth: number
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}
const default_context_value: ContextValue = {
  sidebarWidth: SIDEBAR_OPEN_WIDTH,
  isOpen: true,
  onClose: () => {},
  onOpen: () => {},
}
export const SidebarContext = createContext<ContextValue>(default_context_value)

interface SidebarProviderProps {
  children: ReactNode
}
const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const contextValue: ContextValue = useMemo(
    () => ({
      isOpen,
      sidebarWidth: isOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSE_WIDTH,
      onClose,
      onOpen,
    }),
    [isOpen],
  )
  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

export default SidebarProvider
