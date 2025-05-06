import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface registerUser {
    full_name: string;
    contact_phone: string;
    email: string;
    
    // confirmPassword: string;
}

export const registerAPI = createApi({
    reducerPath: 'registerAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/users' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<registerUser, Partial<registerUser>>({
            query: (user) => ({
                url: 'register',
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation<registerUser, Partial<registerUser>>({
            query: (user) => ({
                url: 'logout',
                method: 'POST',
                body: user,
            }),
        })

    }),
});

const { registerUser, logout } = registerAPI.endpoints;

export const useRegisterUser = registerUser.useMutation;
export const useLogout = logout.useMutation;