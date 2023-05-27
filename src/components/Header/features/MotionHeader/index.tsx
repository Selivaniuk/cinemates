'use client'

import { motion } from 'framer-motion'
import { useContext } from 'react'

import styles from './MotionHeader.module.scss'

import { SidebarContext } from 'components/MainLayout/SidebarProvider'

interface MotionHeaderProps {
  children: React.ReactNode
}
const MotionHeader: React.FC<MotionHeaderProps> = ({ children }) => {
  const { sidebarWidth } = useContext(SidebarContext)

  return (
    <motion.header
      initial={{ width: `calc(100vw - ${sidebarWidth}px)` }}
      animate={{ width: `calc(100vw - ${sidebarWidth}px)` }}
      className={styles.header}
    >
      {children}
    </motion.header>
  )
}

export default MotionHeader
