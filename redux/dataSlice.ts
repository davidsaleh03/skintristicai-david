import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DataState {
  value: any | null
}

const initialState: DataState = {
  value: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
    clearData: (state) => {
      state.value = null
    },
  },
})

export const { setData, clearData } = dataSlice.actions
export default dataSlice.reducer