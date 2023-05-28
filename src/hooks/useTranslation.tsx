'use client'

import useLanguageSwitcher from './useLanguageSwitcher'

import translations from 'utils/translations'

type Translations = typeof translations
type TranslationKey = keyof Translations[keyof Translations]

const useTranslation = () => {
  const { language } = useLanguageSwitcher()

  const t = (key: TranslationKey): string => {
    const translation = translations[language][key as keyof Translations[keyof Translations]]

    if (typeof translation === 'string') {
      return translation
    }

    return key
  }

  return { t }
}

export default useTranslation
