import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log("API Base URL: http://localhost:8000/api/"); // Debugging log

export interface Appointment {
    id: number;
    user_id: number;
    fullName: string;
    email: string;
    department: string;
    doctor: string;
    appointmentDate: string;
}

export interface CreateAppointment {
    user_id: number;
    fullName: string;
    email: string;
    department: number;
    doctor: string;
    appointmentDate: string;
}

export const appointmentAPI = createApi({
    reducerPath: "appointmentAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
    endpoints: (builder) => ({
        getAppointments: builder.query<Appointment[], void>({
            query: () => "appointment",
            transformResponse: (response: any) => {
                console.log("Raw API Response:", response); // Debugging log
                return Array.isArray(response) ? response : []; // Ensure response is an array
            },
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("Transformed API Response:", data); // Debugging log
                } catch (error) {
                    console.error("Error fetching appointments:", error);
                }
            },
        }),
        getAppointmentById: builder.query<Appointment, string>({
            query: (id) => `appointment/${id}`,
        }),
        updateAppointment: builder.mutation<void, Partial<Appointment>>({
            query: (appointment) => ({
                url: `appointment/${appointment.id}`,
                method: "PUT",
                body: appointment,
            }),
        }),
        deleteAppointment: builder.mutation<void, string>({
            query: (id) => ({
                url: `appointment/${id}`,
                method: "DELETE",
            }),
        }),
        createAppointment: builder.mutation<void, CreateAppointment>({
            query: (appointment) => ({
                url: "appointment",
                method: "POST",
                body: appointment,
            }),
        }),
    }),
});

export const {
    useCreateAppointmentMutation,
    useGetAppointmentsQuery,
    useDeleteAppointmentMutation,
} = appointmentAPI;