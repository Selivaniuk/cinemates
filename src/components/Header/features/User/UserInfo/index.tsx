'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useLayoutEffect, useRef, useState } from 'react'

import LevelProgress from './LevelProgress'
import styles from './UserInfo.module.scss'

import useClickOutside from 'hooks/useClickOutside'
import useLanguageSwitcher from 'hooks/useLanguageSwitcher'
import useThemeSwitcher from 'hooks/useThemeSwitcher'
import Icon from 'ui/Icon'
import calculateLevelExperience from 'utils/calculateLevelExperience'
import { capitalize } from 'utils/textUtils'

interface UserInfoProps {
  name?: string
  image?: string | null
}
const UserInfo: React.FC<UserInfoProps> = ({ image, name }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)
  const ref = useClickOutside(() => setIsOpen(false))
  const { theme, toggleTheme } = useThemeSwitcher()
  const { language, toggleLanguage } = useLanguageSwitcher()
  // const currentTheme = Themes[]
  const { level, levelProgress } = calculateLevelExperience(777)
  const avatar = image ?? '/avatar.png'

  useLayoutEffect(() => {
    const clientHeight = modalRef.current?.scrollHeight
    if (clientHeight && isOpen) setHeight(clientHeight)
  }, [modalRef, isOpen])

  const onSignOut = () => {
    signOut({ callbackUrl: '/signin' })
  }

  return (
    <div ref={ref} className={styles.user}>
      <div className={styles.userAvatar} role='menuitem' tabIndex={0} onClick={() => setIsOpen((v) => !v)}>
        <LevelProgress size={40} progress={levelProgress}>
          <Image className={styles.avatar} alt='avatar' src={avatar} width={30} height={30} />
        </LevelProgress>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            className={styles.userMenu}
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: height }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.info}>
              <Image className={styles.avatar} alt='avatar' src={avatar} width={40} height={40} />
              <div>
                <p className={styles.name}>{name}</p>
                <p className={styles.level}>Level: {level}</p>
              </div>
            </div>
            <div className={styles.separator} />
            <div role='button' tabIndex={0} className={styles.item}>
              <Icon className={styles.icon} name='person' />
              <p className={styles.label}>Profile</p>
            </div>
            <div role='button' tabIndex={0} className={styles.item}>
              <Icon className={styles.icon} name='settings' />
              <p className={styles.label}>Settings</p>
            </div>
            <div className={styles.separator} />
            <div role='button' tabIndex={0} className={styles.item} onClick={toggleTheme}>
              <Icon className={styles.icon} name={`${theme}_mode`} />
              <div className={styles.keyValue}>
                <p className={styles.label}>Theme:</p>
                <p className={styles.value}>{capitalize(theme)}</p>
              </div>
            </div>
            <div role='button' tabIndex={0} className={styles.item} onClick={toggleLanguage}>
              <Icon className={styles.icon} name='language' />
              <div className={styles.keyValue}>
                <p className={styles.label}>Language:</p>
                <p className={styles.value}>{capitalize(language)}</p>
              </div>
            </div>
            <div className={styles.separator} />
            <div className={styles.item} onClick={onSignOut} role='button' tabIndex={0}>
              <Icon className={styles.icon} name='logout' />
              <p className={styles.label}>Sign out</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserInfo
