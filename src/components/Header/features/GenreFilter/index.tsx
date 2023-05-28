'use client'

import classNames from 'classnames'

import { AnimatePresence, motion } from 'framer-motion'

import styles from './GenreFilter.module.scss'

import useTranslation from 'hooks/useTranslation'
import { useDispatch, useSelector } from 'store'
import { setGenresFilter } from 'store/genresFilterSlice'
import { GenresFilterValueType } from 'types/entities'

type FilterType = {
  label: string
  value: GenresFilterValueType
}

const variants = {
  enter: {
    x: '100%',
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: '-100%',
    opacity: 0,
  },
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
  const activeValue = FILTERS.find((f) => f.value === filterValue)
  const currentIndex = FILTERS.findIndex((f) => f.value === filterValue)
  const handleMobileClick = () => {
    const newIndex = FILTERS.length > currentIndex + 1 ? currentIndex + 1 : 0
    const newValue = FILTERS[newIndex].value
    dispatch(setGenresFilter(newValue))
  }

  return (
    <>
      <div className={styles.mobileWrapper}>
        <AnimatePresence initial={false} custom={currentIndex} mode='popLayout'>
          <motion.span
            key={currentIndex}
            custom={currentIndex}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={handleMobileClick}
            role='button'
            tabIndex={0}
            className={styles.mobileFilter}
          >
            <p>{activeValue?.label}</p>
          </motion.span>
        </AnimatePresence>
      </div>
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
    </>
  )
}
export default GenreFilter
