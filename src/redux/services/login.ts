import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUserInfo } from '../slices/login';
import { LoginResponse } from '../type/login'

export const api = createApi({
    reducerPath: 'login',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4999/api',
        prepareHeaders: (headers, { getState, endpoint }) => {
            const state = getState() as { auth: { token: string | null } };
            const token = state.auth.token;

            if (endpoint === 'login' || endpoint === 'register') {
                return headers;
            }

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<
            LoginResponse, // 回應資料型別
            { email: string; password: string } // 傳遞參數型別
        >({
        query: (credentials) => ({
            url: '/auth/login',
            method: 'POST',
            body: credentials,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
                const { data } = await queryFulfilled;
                dispatch(setUserInfo(data)); // 登入成功後存入 Redux
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
        }),
    })
})

export const {
    useLoginMutation
} = api