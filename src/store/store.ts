import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import global from './modules/global'
import authSlice from './modules/authSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  global,
  authSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)
export default store
