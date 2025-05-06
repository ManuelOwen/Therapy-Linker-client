import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface departments {
    id: number;
    department_name: string;
    department: string;
    image_url: string;
    description: string;
    icon: string;
}
export const  departmentsApi = createApi({
    // fetch doctors from database
    reducerPath: "deprtmentsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api/"}),
    endpoints:(builder)=>({
        getDepartments:builder.query({
            query:()=>`department`,
        })
        //get a single department
        ,getDepartmentById:builder.query({
            query:(id)=>`department/${id}`,
        })
        //update a department
        ,updateDepartment:builder.mutation({
            query:(department)=>({
                url:`department/${department.id}`,
                method:"PUT",
                body:department,
            })
        })
        //delete a department
        ,deleteDepartment:builder.mutation({
            query:(id)=>({
                url:`department/${id}`,
                method:"DELETE",
            })
        })
        //create a department
        ,createDepartment:builder.mutation({
            query:(department)=>({
                url:`department`,
                method:"POST",
                body:department,
            })
        })
        
    })
});