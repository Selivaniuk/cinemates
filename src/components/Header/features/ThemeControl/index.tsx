'use client'

import { AnimatePresence, motion } from 'framer-motion'

import useThemeSwitcher from 'hooks/useThemeSwitcher'
import Button from 'ui/Button'
import Icon from 'ui/Icon'

const ThemeControl: React.FC = () => {
  const { theme, toggleTheme } = useThemeSwitcher()

  return (
    <Button
      variant='flex-rv'
      appearance='soft-transparent'
      onClick={toggleTheme}
      icon={
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            style={{ display: 'inline-flex' }}
            key={`${theme}-ico`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon name={`${theme}_mode`} />
          </motion.div>
        </AnimatePresence>
      }
      size='small'
      rounded
    />
  )
}

export default ThemeControl
