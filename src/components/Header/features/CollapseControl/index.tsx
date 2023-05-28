'use client'

import classNames from 'classnames'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import styles from './CollapseControl.module.scss'

import LogoSmall from 'assets/logo/small.svg'
import { SidebarContext } from 'components/MainLayout/SidebarProvider'
import Icon from 'ui/Icon'

const CollapseControl: React.FC = () => {
  const router = useRouter()
  const { isOpen, onClose, onOpen } = useContext(SidebarContext)

  return (
    <>
      <LogoSmall
        onClick={() => {
          router.push('/')
        }}
        className={styles.logo}
      />
      <div className={styles.collapseControl}>
        <Icon
          onClick={() => isOpen && onClose()}
          className={classNames([styles.closeIcon, { [styles.canClick]: isOpen }])}
          name='chevron_left'
        />
        <Icon
          onClick={() => !isOpen && onOpen()}
          className={classNames([styles.openIcon, { [styles.canClick]: !isOpen }])}
          name='chevron_right'
        />
      </div>
    </>
  )
}
export default CollapseControl
