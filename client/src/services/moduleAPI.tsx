import {baseAPI} from "./baseAPI";
import {IModule} from "../models/IModule";
import {IUserSubscription} from "../models/IUserSubscription";

export const moduleAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createModule: build.mutation<IModule, FormData>({
            query: (body) => ({
                url: '/module',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Modules', 'Module', 'Courses']
        }),
        updateModule: build.mutation<IModule, { _id: string, body: FormData }>({
            query: ({_id, body}) => ({
                url: `/module/${_id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Modules', 'Module', 'Courses']
        }),
        getAllModules: build.query<IModule[], void>({
            query: () => '/module'
        }),
        getModule: build.query<IModule, string>({
            query: (id) => `/module/${id}`
        }),
        getModuleForTeacher: build.query<{ module: IModule, subscriptions: IUserSubscription[] }, { moduleId: string, flowId: string }>({
            query: ({flowId, moduleId}) => `/module/teacher/${moduleId}/${flowId}`,
            providesTags: ['Module']
        })
    }),
    overrideExisting: true
})

export const {
    useCreateModuleMutation,
    useUpdateModuleMutation,
    useGetAllModulesQuery,
    useGetModuleQuery,
    useGetModuleForTeacherQuery,
} = moduleAPI

export const {reducer, middleware} = moduleAPI
