import {baseAPI} from "./baseAPI";
import {ICourse} from "../models/ICourse";
import {ILesson} from "../models/ILesson";
import {IUser} from '../models/IUser';
import {ITest} from "../models/ITest";
import {IUserFlow} from "../models/IUserFlow";

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
    }),
    overrideExisting: true
})


export const {
    useCreateTestMutation,
    useGetAllUsersQuery,
    useSetRoleMutation,
    useUpdateTestMutation,
} = adminAPI

export const {reducer, middleware} = adminAPI
