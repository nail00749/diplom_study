import {baseAPI} from "./baseAPI";
import {ICourse} from "../models/ICourse";
import {ILesson} from "../models/ILesson";
import {IUser} from '../models/IUser';
import {ITest} from "../models/ITest";
import {IUserFlow} from "../models/IUserFlow";

export const adminAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createCourse: build.mutation({
            query: (body) => ({
                url: '/course',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Courses']
        }),
        updateCourse: build.mutation<ICourse, { body: FormData, _id: string }>({
            query: ({_id, body}) => ({
                url: `/course/?course_id=${_id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Course'],
        }),
        createLesson: build.mutation({
            query: (body) => ({
                url: '/lesson',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Lesson']
        }),
        updateLesson: build.mutation<ILesson, any>({
            query: ({_id, ...body}) => ({
                url: `/lesson/?lesson_id=${_id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Courses', 'Lessons', 'Lesson']
        }),
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
    useCreateCourseMutation,
    useCreateLessonMutation,
    useCreateTestMutation,
    useUpdateCourseMutation,
    useUpdateLessonMutation,
    useGetAllUsersQuery,
    useSetRoleMutation,
    useUpdateTestMutation,
} = adminAPI

export const {reducer, middleware} = adminAPI
