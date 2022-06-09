import {baseAPI} from "./baseAPI";
import {IUserFlow} from "../models/IUserFlow";
import {IFlowResult} from "../models/IFlowResult";


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
        getOneTeacherFlow: build.query<IUserFlow, string>({
            query: (userFlowId) => `/user-flow/${userFlowId}`,
            providesTags: ['Flow']
        }),
        getMyResultFlow: build.query<IFlowResult, string>({
            query: (flowId) => `/result-flow/${flowId}`,
            providesTags: ['MyResult']
        })

    }),
    overrideExisting: true
})

export const {
    useGetAllUserFlowQuery,
    useGetAllTeacherFlowQuery,
    useCreateUserFlowMutation,
    useGetOneTeacherFlowQuery,
    useGetMyResultFlowQuery,
} = userFlowAPI

export const {reducer, middleware} = userFlowAPI
