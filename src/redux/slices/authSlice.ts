import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  email: string
  role: 'user' | 'admin'
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  nextRoutePath: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  nextRoutePath: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.nextRoutePath = null
    },
    setNextRoutePath: (state, action: PayloadAction<string>) => {
      state.nextRoutePath = action.payload
    },
    clearNextRoutePath: (state) => {
      state.nextRoutePath = null
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const { login, logout, setNextRoutePath, clearNextRoutePath, refreshToken } = authSlice.actions
export default authSlice.reducer