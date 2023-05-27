'use client'

import { motion } from 'framer-motion'
import { useContext } from 'react'

import { SidebarContext } from './SidebarProvider'

const MAIN_PADDING = 24

interface MotionMainProps {
  children: React.ReactNode
}

const MotionMain: React.FC<MotionMainProps> = ({ children }) => {
  const { sidebarWidth } = useContext(SidebarContext)
  const paddingLeft = sidebarWidth + MAIN_PADDING

  return (
    <motion.main style={{ paddingTop: MAIN_PADDING + 60 }} initial={{ paddingLeft }} animate={{ paddingLeft }}>
      {children}
    </motion.main>
  )
}
export default MotionMain
