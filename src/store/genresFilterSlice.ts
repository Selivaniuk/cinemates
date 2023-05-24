import { createSlice } from '@reduxjs/toolkit'

import { GenresFilterValueType } from 'types/entities'

import type { PayloadAction } from '@reduxjs/toolkit'

interface initialStateType {
  filterValue: GenresFilterValueType
}
const initialState: initialStateType = {
  filterValue: 'all',
}
const genresFilterSlice = createSlice({
  name: 'genresFilter',
  initialState,
  reducers: {
    setGenresFilter: (state, action: PayloadAction<GenresFilterValueType>) => {
      state.filterValue = action.payload
    },
  },
})

export const { setGenresFilter } = genresFilterSlice.actions
export default genresFilterSlice.reducer
