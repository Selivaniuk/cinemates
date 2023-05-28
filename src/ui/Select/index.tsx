'use client'

import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSProperties, ReactNode, useLayoutEffect, useRef, useState } from 'react'

import styles from './Select.module.scss'

import useClickOutside from 'hooks/useClickOutside'
import Icon from 'ui/Icon'

type SelectType = 'outline' | 'transparent' | 'soft-transparent'

interface Option<T> {
  value: T
  label: string
}

interface SelectProps<T> {
  options: Option<T>[]
  value?: T
  onChange?: (value: T) => void
  className?: string
  style?: CSSProperties
  placeholder?: string
  type?: SelectType
  icon?: ReactNode
}

const Select = <T extends string | number>({
  options,
  onChange,
  value,
  className,
  style,
  icon,
  placeholder = 'Select',
  type = 'outline',
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => setIsOpen(false))
  const optionsRef = useRef<HTMLDivElement>(null)

  const handleChange = (selectedValue: T) => {
    onChange?.(selectedValue)
    setIsOpen(false)
  }

  useLayoutEffect(() => {
    if (isOpen && optionsRef.current) {
      const numOptions = options.length
      const optionHeight = 36
      const maxHeight = numOptions * optionHeight + 4 + 16

      optionsRef.current.style.maxHeight = maxHeight > 200 ? '200px' : `${maxHeight}px`
    }
  }, [isOpen, options.length])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div
      ref={ref}
      className={classNames([className, styles.select, styles[type], { [styles.open]: isOpen }])}
      style={style}
    >
      <div
        role='textbox'
        tabIndex={0}
        className={classNames([styles.selectedOption, { [styles.placeholder]: !selectedOption && placeholder }])}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {selectedOption?.label ?? placeholder}
        <Icon style={{ fontSize: 14 }} name='expand_more' className={styles.arrowIcon} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.optionsWrapper}
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: '200px' }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.options} ref={optionsRef}>
              {/* {hasNullValue && (
                <div
                  className={classNames([styles.option, { [styles.selected]: selectedOption?.value === null }])}
                  onClick={() => handleChange(null)}
                >
                  All
                </div>
              )} */}
              {options.map((option) => (
                <div
                  role='option'
                  tabIndex={0}
                  key={option.value}
                  className={classNames([styles.option, { [styles.selected]: selectedOption?.value === option.value }])}
                  onClick={() => handleChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Select
