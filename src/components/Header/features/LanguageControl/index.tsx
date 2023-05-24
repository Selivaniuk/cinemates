'use client'

import { useSelector, useDispatch } from 'store'
import { setLanguage } from 'store/userSlice'
import { Language } from 'types/entities'
import Icon from 'ui/Icon'
import Select from 'ui/Select'

type optionType = {
  label: string
  value: Language
}
const options: optionType[] = [
  { label: 'EN', value: 'en' },
  { label: 'RU', value: 'ru' },
]
const LanguageControl: React.FC = () => {
  const dispatch = useDispatch()
  const language = useSelector((store) => store.user.language)
  const handleChange = (value: Language) => {
    dispatch(setLanguage(value))
  }
  return (
    <Select
      options={options}
      value={language}
      onChange={handleChange}
      type='soft-transparent'
      icon={<Icon style={{ fontSize: 16 }} name='language' />}
    />
  )
}

export default LanguageControl
