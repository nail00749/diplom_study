import {baseAPI} from "./baseAPI";
import {IUser} from '../models/IUser';
import {ITest} from "../models/ITest";


export const adminAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createTest: build.mutation({
            query: (body) => ({
                url: '/test',
                method: 'POST',
                body
            })
        }),
        updateTest: build.mutation<ITest, ITest>({
            query: ({_id, ...body}) => ({
                url: `/test/?test_id=${_id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Lesson']
        }),
        getAllUsers: build.query<IUser[], void>({
            query: () => ('/users'),
            providesTags: ['Users']
        }),
        setRole: build.mutation({
            query: ({id, ...body}) => ({
                url: `/admin/users/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Users']
        }),
        generateLink: build.mutation<any, void>({
            query: () => ({
                url: '/admin/link',
                method: "POST"
            })
        }),
    }),
    overrideExisting: true
})


export const {
    useCreateTestMutation,
    useGetAllUsersQuery,
    useSetRoleMutation,
    useUpdateTestMutation,
    useGenerateLinkMutation
} = adminAPI

export const {reducer, middleware} = adminAPI
