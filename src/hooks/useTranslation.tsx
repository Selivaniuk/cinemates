'use client'

import { useSelector } from 'store'
import translations from 'utils/translations'

type Translations = typeof translations
type TranslationKey = keyof Translations[keyof Translations]

const useTranslation = () => {
  const currentLanguage = useSelector((store) => store.user.language)

  const t = (key: TranslationKey): string => {
    const translation = translations[currentLanguage][key as keyof Translations[keyof Translations]]

    if (typeof translation === 'string') {
      return translation
    }

    return key
  }

  return { t }
}

export default useTranslation
