import classNames from 'classnames'
import { CSSProperties, ChangeEvent } from 'react'

import styles from './Input.module.scss'

type InputType = 'outline' | 'transparent' | 'soft-transparent'
type InputStatus = 'default' | 'error' | 'warning' | 'success'

interface InputProps {
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: InputType
  status?: InputStatus
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  className?: string
  style?: CSSProperties
}

const Input: React.FC<InputProps> = ({
  prefix,
  suffix,
  className,
  style,
  type = 'outline',
  status = 'default',
  ...props
}) => (
  <div style={style} className={classNames([className, styles.input, styles[type], styles[status]])}>
    {prefix && <span className={styles.prefix}>{prefix}</span>}
    <input className={styles.field} type='text' {...props} />
    {suffix && <span className={styles.suffix}>{suffix}</span>}
  </div>
)

export default Input
