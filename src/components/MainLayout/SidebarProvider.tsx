'use client'

import { ReactNode, createContext, useCallback, useLayoutEffect, useMemo, useState } from 'react'

import useWindowSize, { MOBILE_WIDTH } from 'hooks/useWindowSize'

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
  const { width } = useWindowSize()
  const isMobile = width ? width <= MOBILE_WIDTH : false
  const [isOpen, setIsOpen] = useState(isMobile)

  useLayoutEffect(() => {
    if (isMobile && isOpen) setIsOpen(false)
  }, [isMobile, isOpen])

  const getSidebarWidth = useCallback(() => {
    if (isMobile) return 0
    if (isOpen) return SIDEBAR_OPEN_WIDTH
    return SIDEBAR_CLOSE_WIDTH
  }, [isOpen, isMobile])

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const contextValue: ContextValue = useMemo(
    () => ({
      isOpen,
      sidebarWidth: getSidebarWidth(),
      onClose,
      onOpen,
    }),
    [isOpen, getSidebarWidth],
  )
  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

export default SidebarProvider
