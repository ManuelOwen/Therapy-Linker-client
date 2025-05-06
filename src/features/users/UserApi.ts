import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TUser {
    id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    password: string;
    user_id: number;
    profile_picture: string;
    therapist: boolean;
    is_admin: boolean;
    is_active: boolean;
    role: string;
}

// Define the API slice
export const userAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
    tagTypes: ['getUsers'],
    endpoints: (builder) => ({
        getUsers: builder.query({ query: () => 'users',
            providesTags: ['getUsers'],
         }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['getUsers'],
        }),
// get user by id
        getUserById: builder.query({
            query: (id) => `users/${id}`,
        }),

        updateUser: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['getUsers'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getUsers'],
        }),
    }),
});

// Export the auto-generated hooks
// export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userAPI;