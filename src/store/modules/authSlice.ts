import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store/store'
const namespace = 'authSlice'

export interface AuthState {
  auth: string[]
}

const initialState: AuthState = {
  auth: ['首页'],
}

export const authSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        auth: ['首页', ...action.payload],
      }
    },
    clearAuth: (state) => {
      return {
        ...state,
        auth: [],
      }
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions

export const selectAuth = (state: RootState) => state.authSlice

export default authSlice.reducer
