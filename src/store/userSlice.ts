import { createSlice } from '@reduxjs/toolkit'

import { Language, Theme } from 'types/entities'

import type { PayloadAction } from '@reduxjs/toolkit'

interface initialStateType {
  theme: Theme
  language: Language
}
const initialState: initialStateType = {
  theme: 'dark',
  language: 'en',
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload
    },
  },
})

export const { setTheme, setLanguage } = userSlice.actions
export default userSlice.reducer
