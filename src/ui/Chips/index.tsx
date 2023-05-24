import classNames from 'classnames'

import { ButtonHTMLAttributes } from 'react'

import styles from './Chips.module.scss'

interface ChipsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'light' | 'secondary' | 'flex'
  appearance?: 'fill' | 'opacity'
}

const Chips: React.FC<ChipsProps> = ({ variant = 'primary', appearance = 'fill', children, className, ...props }) => (
  <button
    type='button'
    className={classNames([className, styles.chips, styles[variant], styles[appearance]])}
    {...props}
  >
    {children}
  </button>
)

export default Chips
