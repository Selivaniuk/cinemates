'use client'

import { useCookies } from 'react-cookie'

import { Language } from 'types/entities'

interface ThemeSwitcherProps {
  language: Language
  toggleLanguage: () => void
}

const useLanguageSwitcher = (): ThemeSwitcherProps => {
  const [cookies, setCookie] = useCookies(['language'])
  const language: Language = cookies.language ?? 'en'

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'ru' : 'en'
    setCookie('language', newLanguage)
  }

  return { language, toggleLanguage }
}

export default useLanguageSwitcher
