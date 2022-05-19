import {emptyContentAPI} from "./emptyContentAPI";
import {ICourse} from "../models/ICourse";
import {ILesson} from "../models/ILesson";

export const adminAPI = emptyContentAPI.injectEndpoints({
    endpoints: (build) => ({
        createCourse: build.mutation({
            query: (body) => ({
                url: '/courses',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Course']
        }),
        updateCourse: build.mutation<ICourse, ICourse>({
            query: (body) => ({
                url: `/courses/?course_id=${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Course'],
        }),
        createLesson: build.mutation({
            query: (body) => ({
                url: '/lessons',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Lesson']
        }),
        updateLesson: build.mutation<ILesson, ILesson>({
            query: (body) => ({
                url: `/lessons/?lesson_id=${body.id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Course', 'Lesson']
        }),
        createTest: build.mutation({
            query: (body) => ({
                url: '/tests',
                method: 'POST',
                body
            })
        }),
        updateTest: build.mutation({
            query: (body) => ({
                url: `/tests/?test_id=${body.id}`,
                method: 'PATCH',
                body
            })
        }),
        getAllUsers: build.query({
            query: () => ('/users'),
            providesTags: ['Users']
        }),
        setRole: build.mutation({
            query: (body) => ({
                url: `/admin/users/${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Users']
        })
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
    useUpdateTestMutation
} = adminAPI

export const {reducer, middleware} = adminAPI
