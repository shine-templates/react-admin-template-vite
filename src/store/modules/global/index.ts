import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
const namespace = 'global'

export enum ELayout {
  side = 1,
  fullPage,
}

export interface IGlobalState {
  layout: ELayout
  collapsed: boolean
  openKeys: string[]
  isFullPage: boolean
}

const initialState: IGlobalState = {
  collapsed: window.innerWidth < 1000,
  openKeys: [],
  isFullPage: false,
  layout: ELayout.side,
}

const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      if (action.payload === null) {
        state.collapsed = !state.collapsed
      } else {
        state.collapsed = !!action.payload
      }
    },
    handleOpenkeys: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        openKeys: action.payload,
      }
    },
    switchFullPage: (state, action) => {
      state.isFullPage = !!action?.payload
    },
  },
})

export const selectGlobal = (state: RootState) => state.global

export const { toggleMenu, handleOpenkeys, switchFullPage } = globalSlice.actions

export default globalSlice.reducer
