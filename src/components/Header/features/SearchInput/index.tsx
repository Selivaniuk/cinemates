'use client'

import styles from './SearchInput.module.scss'

import useTranslation from 'hooks/useTranslation'

import Icon from 'ui/Icon'
import Input from 'ui/Input'

const SearchInput: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Input
      className={styles.searchInput}
      placeholder={t('search_input_placeholder')}
      suffix={<Icon name='search' />}
      type='soft-transparent'
    />
  )
}

export default SearchInput
