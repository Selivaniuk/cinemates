'use client'

import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import NextLink from 'next/link'

import { CSSProperties, ReactNode } from 'react'

import styles from './Link.module.scss'

interface LinkProps {
  label: string
  href: string
  className?: string
  style?: CSSProperties
  icon?: ReactNode
  collapsed?: boolean
  active?: boolean
}
const Link: React.FC<LinkProps> = ({ label, href, className, style, icon, collapsed = false, active = false }) => (
  <NextLink
    href={href}
    style={style}
    className={classNames([className, styles.link, { [styles.collapsed]: collapsed }, { [styles.active]: active }])}
  >
    {icon && icon}
    <AnimatePresence initial={false}>
      {!collapsed ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.label}
        >
          {label}
        </motion.p>
      ) : (
        <div style={{ height: 25 }} />
      )}
    </AnimatePresence>
  </NextLink>
)

export default Link
