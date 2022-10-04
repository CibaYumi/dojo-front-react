import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, UserSliceState } from './type'

const initialState: UserSliceState = {
  user: {
    name: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = {
        ...action.payload,
      }
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
