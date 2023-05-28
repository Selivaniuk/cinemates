'use client'

import { Theme } from '@prisma/client'
import { useCookies } from 'react-cookie'

interface ThemeSwitcherProps {
  theme: Theme
  toggleTheme: () => void
}

const useThemeSwitcher = (): ThemeSwitcherProps => {
  const [cookies, setCookie] = useCookies(['theme'])
  const theme: Theme = cookies.theme ?? 'light'

  const toggleTheme = () => {
    const root = document.documentElement
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    root.dataset.theme = newTheme
    setCookie('theme', newTheme)
  }

  return {
    theme,
    toggleTheme,
  }
}

export default useThemeSwitcher
