import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse } from '../type/login'

interface User {
  id: number
  email: string
  name: string
  role?: 'user' | 'admin'
}

interface State {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  nextRoutePath: string | null
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
  token: null,
  nextRoutePath: null,
}

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setUserInfo: (state, action: PayloadAction<LoginResponse>) => {
      // console.log(action.payload, 'setUserInfo')
      state.isAuthenticated = true;
      state.token = action.payload.token ?? null;
      state.user = action.payload.user ? {
        id: action.payload.user.id,
        email: action.payload.user.email,
        name: action.payload.user.name
      } : null;

      // const params = {
      //   isAuthenticated: state.isAuthenticated,
      //   token: state.token,
      //   user: state.user
      // }
      // LocalStorageHelper.set("userLoginStatus", params)
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

export const {
  login,
  setUserInfo,
  logout,
  setNextRoutePath,
  clearNextRoutePath,
  refreshToken
} = authSlice.actions
export default authSlice.reducer