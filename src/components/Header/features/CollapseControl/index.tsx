'use client'

import classNames from 'classnames'

import { useContext } from 'react'

import styles from './CollapseControl.module.scss'

import { SidebarContext } from 'components/BodyLayout/SidebarProvider'
import Icon from 'ui/Icon'

const CollapseControl: React.FC = () => {
  const { isOpen, onClose, onOpen } = useContext(SidebarContext)
  return (
    <div className={styles.collapseControl}>
      <Icon
        onclick={() => isOpen && onClose()}
        className={classNames([styles.closeIcon, { [styles.canClick]: isOpen }])}
        name='chevron_left'
      />
      <Icon
        onclick={() => !isOpen && onOpen()}
        className={classNames([styles.openIcon, { [styles.canClick]: !isOpen }])}
        name='chevron_right'
      />
    </div>
  )
}
export default CollapseControl
