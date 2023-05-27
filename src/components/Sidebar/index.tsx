'use client'

import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'

import { usePathname } from 'next/navigation'

import { useContext } from 'react'

import styles from './Sidebar.module.scss'

import LogoLarge from 'assets/logo/large.svg'
import LogoSmall from 'assets/logo/small.svg'

import { SidebarContext } from 'components/MainLayout/SidebarProvider'
import useTranslation from 'hooks/useTranslation'
import Icon from 'ui/Icon'
import Link from 'ui/Link'

const Sidebar: React.FC = () => {
  const { isOpen, sidebarWidth } = useContext(SidebarContext)
  const pathname = usePathname()
  const { t } = useTranslation()
  const SIDEBAR_LINKS = [
    {
      category: t('sidebar_menu_label'),
      links: [
        { label: t('sidebar_menu_links_home'), href: '/', icon: 'home' },
        { label: t('sidebar_menu_links_watch_later'), href: '/watch-later', icon: 'schedule' },
        {
          label: t('sidebar_menu_links_continue_watching'),
          href: '/continue-watching',
          icon: 'fast_forward',
        },
        { label: t('sidebar_menu_links_history'), href: '/history', icon: 'history' },
      ],
    },
    {
      category: t('sidebar_social_label'),
      links: [
        { label: t('sidebar_social_links_friends'), href: '/friends', icon: 'group' },
        { label: t('sidebar_social_links_rooms'), href: '/rooms', icon: 'movie' },
      ],
    },
  ]
  return (
    <motion.div
      initial={{ width: sidebarWidth }}
      animate={{ width: sidebarWidth }}
      transition={{ duration: 0.3 }}
      className={classNames([styles.sidebar, { [styles.collapsed]: !isOpen }])}
    >
      {isOpen ? <LogoLarge className={styles.logo} /> : <LogoSmall className={styles.logo} />}

      {SIDEBAR_LINKS.map(({ category, links }) => (
        <div key={category} className={styles.category}>
          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.label}
              >
                {category}
              </motion.p>
            ) : (
              <div style={{ height: 27 }} />
            )}
          </AnimatePresence>

          <ul className={styles.links}>
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  active={isActive}
                  collapsed={!isOpen}
                  className={classNames([styles.link, { [styles.active]: isActive }])}
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={<Icon className={styles.icon} name={link.icon} />}
                />
              )
            })}
          </ul>
        </div>
      ))}
    </motion.div>
  )
}

export default Sidebar
