import {baseAPI} from "./baseAPI";
import {IModuleTask} from "../models/IModuleTask";

export const moduleTaskAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createModuleTask: build.mutation<IModuleTask, Partial<IModuleTask>>({
            query: (body) => ({
                url: '/module-task',
                method: 'POST',
                body
            }),
        }),
        passModuleTask: build.mutation<any, { id: string, body: any }>({
            query: ({id, body}) => ({
                url: `/result-flow/module-task/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['MyResult']
        })

    }),
    overrideExisting: true
})

export const {
    useCreateModuleTaskMutation,
    usePassModuleTaskMutation
} = moduleTaskAPI

export const {reducer, middleware} = moduleTaskAPI
