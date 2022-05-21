import {baseAPI} from "./baseAPI";
import {IUserFlow} from "../models/IUserFlow";


export const userFlowAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createUserFlow: build.mutation<IUserFlow, IUserFlow>({
            query: (body) => ({
                url: '/user-flow',
                method: 'POST',
                body
            })
        }),
        getAllUserFlow: build.query<IUserFlow[], void>({
            query: () => '/user-flow'
        })
    }),
    overrideExisting: true
})

export const {
    useGetAllUserFlowQuery,
    useCreateUserFlowMutation,
} = userFlowAPI

export const {reducer, middleware} = userFlowAPI
