import {baseAPI} from "./baseAPI";
import {ILesson} from "../models/ILesson";
import {IModule} from "../models/IModule";

export const moduleAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createModule: build.mutation<IModule, FormData>({
            query: (body) => ({
                url: '/module',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Lessons']
        }),
        updateModule: build.mutation<IModule, { _id: string, body: FormData }>({
            query: ({_id, ...body}) => ({
                url: `/module/${_id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Courses', 'Lessons', 'Lesson']
        }),
        getAllModules: build.query<IModule[], void>({
            query: () => '/module'
        }),
        getModule: build.query<IModule, string>({
            query: (id) => `/module/${id}`
        }),


    }),
    overrideExisting: true
})

export const {
    useCreateModuleMutation,
    useUpdateModuleMutation,
    useGetAllModulesQuery,
    useGetModuleQuery,
} = moduleAPI

export const {reducer, middleware} = moduleAPI
