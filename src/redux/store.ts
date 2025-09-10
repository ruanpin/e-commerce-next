import { configureStore } from '@reduxjs/toolkit'
import login from './slices/login'

export const store = configureStore({
  reducer: {
    auth: login,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch