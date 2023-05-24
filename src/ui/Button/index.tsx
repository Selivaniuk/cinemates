import classNames from 'classnames'
import { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'light' | 'gradient' | 'flex' | 'flex-rv'
  size?: 'small' | 'medium' | 'large'
  appearance?: 'fill' | 'transparent' | 'soft-transparent'
  iconPosition?: 'left' | 'right'
  rounded?: boolean
  icon?: ReactNode
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  iconPosition = 'left',
  appearance = 'fill',
  icon,
  loading = false,
  rounded = false,
  disabled = false,
  type = 'button',
  className,
  ...props
}) => (
  <button
    className={classNames([
      className,
      styles.button,
      styles[variant],
      styles[size],
      styles[appearance],
      styles[`icon-${iconPosition}`],
      { [styles.loading]: loading },
      { [styles.rounded]: rounded },
    ])}
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={disabled || loading}
    {...props}
  >
    {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
    {children && <span className={styles.text}>{children}</span>}
    {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
  </button>
)

export default Button
