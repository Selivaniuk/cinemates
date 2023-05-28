'use client'

import classNames from 'classnames'
import { useState } from 'react'

import styles from './SearchInput.module.scss'

import useTranslation from 'hooks/useTranslation'
import useWindowSize, { LAPTOP_WIDTH } from 'hooks/useWindowSize'

import Icon from 'ui/Icon'
import Input from 'ui/Input'

const SearchInput: React.FC = () => {
  const [isInputOpen, setIsInputOpen] = useState(false)
  const { width } = useWindowSize()
  const isLaptop = width ? width <= LAPTOP_WIDTH : false
  const { t } = useTranslation()

  const getPlaceholder = () => {
    if (isLaptop && !isInputOpen) {
      return undefined
    }
    return t('search_input_placeholder')
  }

  const handleIconClick = () => {
    if (width && isLaptop) setIsInputOpen((v) => !v)
  }

  return (
    <Input
      className={classNames([styles.searchInput, { [styles.isOpen]: isInputOpen }])}
      placeholder={getPlaceholder()}
      suffix={<Icon onClick={handleIconClick} className={styles.icon} name='search' />}
      type='soft-transparent'
    />
  )
}

export default SearchInput
