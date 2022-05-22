import {baseAPI} from "./baseAPI";
import {IUserFlow} from "../models/IUserFlow";


export const userFlowAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createUserFlow: build.mutation<IUserFlow, { name: string, date: Date, course: string, teacher: string }>({
            query: (body) => ({
                url: '/user-flow',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Flows']
        }),
        getAllUserFlow: build.query<IUserFlow[], void>({
            query: () => '/user-flow',
            providesTags: ['Flows']
        }),
        getAllTeacherFlow: build.query<IUserFlow[], void>({
            query: () => '/user-flow/teacher',
            providesTags: ['Flows']
        }),

    }),
    overrideExisting: true
})

export const {
    useGetAllUserFlowQuery,
    useGetAllTeacherFlowQuery,
    useCreateUserFlowMutation,
} = userFlowAPI

export const {reducer, middleware} = userFlowAPI
