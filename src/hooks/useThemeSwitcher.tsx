'use client'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'store'
import { setTheme } from 'store/userSlice'

import { Theme } from 'types/entities'

interface ThemeSwitcherProps {
  theme?: Theme
  toggleTheme: () => void
}

const useThemeSwitcher = (): ThemeSwitcherProps => {
  const theme = useSelector((store) => store.user.theme)
  const dispatch = useDispatch()

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
  }
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     const savedTheme = localStorage.getItem('theme') as Theme
  //     setTheme(savedTheme || 'light')
  //   }
  // }, [])
  // useEffect(() => {
  //   const root = document.documentElement
  //   const savedTheme = localStorage.getItem('theme')
  //   if (savedTheme) {
  //     setTheme(savedTheme as Theme)
  //     root.setAttribute('data-theme', savedTheme)
  //   } else {
  //     root.setAttribute('data-theme', theme)
  //   }
  // }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme) {
      // root.setAttribute('data-theme', theme)
      root.dataset.theme = theme
    }
  }, [theme])

  return { theme, toggleTheme }
}

export default useThemeSwitcher
