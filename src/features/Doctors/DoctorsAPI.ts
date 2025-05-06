import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface Doctor {
    id: number;
    name: string;
    department_id: string;
    image_url: string;
    description: string;
    position: string;
    image: string;
    role: string;
    department: string;

}
export interface DoctorFormData {
    name: string;
    department_id: string;
    image_url: string;
    description: string;
    position: string;
}
export const doctorsApi = createApi({
    // fetch doctors from database
    reducerPath: "doctorsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api/"}),
    endpoints:(builder)=>({
        getDoctors:builder.query<Doctor[], void>({
            query:()=>`doctor`,
        }),
        addDoctor: builder.mutation({
            query: (newDoctor) => ({
                url: `doctor`,
                method: "POST",
                body: newDoctor,
            }),
        }),
        editDoctor: builder.mutation({
            query: ({ id, ...updatedDoctor }: { id: number; [key: string]: any }) => ({
                url: `doctor/${id}`,
                method: "PUT",
                body: updatedDoctor,
            }),
        }),
        deleteDoctor: builder.mutation({
            query: (id: number) => ({
                url: `doctor/${id}`,
                method: "DELETE",
            }),
        }),
    })
});

export const {
    useGetDoctorsQuery,
    useAddDoctorMutation,
    useEditDoctorMutation,
    useDeleteDoctorMutation,
} = doctorsApi;