import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../auth/UserSlice';

export interface LoginUser {
    token: string;
    user: User;
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/users' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginUser, Partial<LoginUser>>({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    }),
});

export const useLoginUserMutation: any = loginAPI.useLoginUserMutation;