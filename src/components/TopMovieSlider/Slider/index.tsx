'use client'

import { Movie, Poster } from '@prisma/client'
import { motion } from 'framer-motion'
import { useState } from 'react'

import styles from './Slider.module.scss'

import Button from 'ui/Button'
import Icon from 'ui/Icon'

interface Props {
  movies: Movie[]
  posters: Poster[]
}
const Slider: React.FC<Props> = ({ movies, posters }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentMovie = movies[currentIndex]
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)
  }

  return (
    <div className={styles.wrapper}>
      <Button onClick={prevSlide} size='small' variant='flex'>
        Previous
      </Button>
      <Button onClick={nextSlide} size='small' variant='flex'>
        Next
      </Button>
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.slide}>
          <div className={styles.info}>
            <h3>{currentMovie.name}</h3>
            <p>{currentMovie.year}</p>
            <p>{currentMovie.rating.toFixed(1)}</p>
          </div>
          <div className={styles.buttons}>
            <Button>Watch now</Button>
            <Button variant='dark' appearance='soft-transparent' icon={<Icon name='add' />} />
            <Button variant='dark' appearance='soft-transparent' icon={<Icon name='favorite' />} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Slider
