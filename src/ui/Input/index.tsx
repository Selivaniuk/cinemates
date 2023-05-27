import classNames from 'classnames'
import { CSSProperties, ChangeEvent, HTMLInputTypeAttribute, Ref, ReactNode, FC } from 'react'

import styles from './Input.module.scss'

type InputType = 'outline' | 'transparent' | 'soft-transparent'
export type InputStatusType = 'error' | 'warning' | 'success'

interface InputProps {
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: InputType
  status?: {
    type: InputStatusType
    message: string
  }
  prefix?: ReactNode
  suffix?: ReactNode
  className?: string
  style?: CSSProperties
  label?: string
  htmlType?: HTMLInputTypeAttribute
  name?: string
  ref?: Ref<HTMLInputElement>
}

const Input: FC<InputProps> = ({
  prefix,
  suffix,
  className,
  style,
  type = 'outline',
  status,
  label,
  htmlType,
  name,
  ...props
}) => (
  <div className={styles.wrapper}>
    {label && (
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
    )}
    <div style={style} className={classNames([className, styles.input, styles[type], status && styles[status.type]])}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input id={name} className={styles.field} type={htmlType ?? 'text'} {...props} />
      {suffix && <span className={styles.suffix}>{suffix}</span>}
      <span className={styles.status}>{status?.message}</span>
    </div>
  </div>
)

export default Input
