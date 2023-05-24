'use client'

import classNames from 'classnames'

import styles from './GenreFilter.module.scss'

import useTranslation from 'hooks/useTranslation'
import { useDispatch, useSelector } from 'store'
import { setGenresFilter } from 'store/genresFilterSlice'
import { GenresFilterValueType } from 'types/entities'

type FilterType = {
  label: string
  value: GenresFilterValueType
}

const GenreFilter = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const filterValue = useSelector((store) => store.genresFilter.filterValue)

  const FILTERS: FilterType[] = [
    {
      label: t('header_filters_all'),
      value: 'all',
    },
    {
      label: t('header_filters_movies'),
      value: 'movies',
    },
    {
      label: t('header_filters_serials'),
      value: 'serials',
    },
    {
      label: t('header_filters_anime'),
      value: 'anime',
    },
  ]
  const handleClick = (value: GenresFilterValueType) => {
    dispatch(setGenresFilter(value))
  }

  return (
    <div className={styles.filters}>
      {FILTERS.map((filter, i) => (
        <span
          key={filter.value}
          className={classNames([styles.filter, { [styles.activeFilter]: filterValue === filter.value }])}
        >
          <span onClick={() => handleClick(filter.value)} className={styles.label} role='button' tabIndex={0}>
            {filter.label}
          </span>
          {i + 1 !== FILTERS.length && <span style={{ userSelect: 'none' }}>/</span>}
        </span>
      ))}
    </div>
  )
}
export default GenreFilter
