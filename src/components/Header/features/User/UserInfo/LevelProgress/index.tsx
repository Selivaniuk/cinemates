'use client'

import classNames from 'classnames'
import { motion } from 'framer-motion'

import styles from './LevelProgress.module.scss'

interface LevelProgressProps {
  progress: number
  children: React.ReactNode
  size: number
  className?: string
}
const LevelProgress: React.FC<LevelProgressProps> = ({ children, progress, size, className }) => {
  const trackWidth = 2

  const center = size / 2
  const radius = center - trackWidth
  const dashArray = 2 * Math.PI * radius
  const dashOffset = dashArray * ((100 - progress) / 100)

  return (
    <div className={styles.wrapper} style={{ width: size, height: size }}>
      <svg className={styles.pi} style={{ width: size, height: size }}>
        <circle className={styles.track} cx={center} cy={center} r={radius} strokeWidth={trackWidth} />
        <motion.circle
          className={styles.indicator}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={trackWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap='round'
          initial={{ strokeDasharray: dashArray, strokeDashoffset: dashArray }}
          animate={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <div className={classNames([className, styles.child])}>{children}</div>
    </div>
  )
}

export default LevelProgress
