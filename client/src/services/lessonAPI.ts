import {baseAPI} from "./baseAPI";
import {ILesson} from "../models/ILesson";

export const lessonAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({

        createLesson: build.mutation({
            query: (body) => ({
                url: '/lesson',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Lessons']
        }),
        updateLesson: build.mutation<ILesson, any>({
            query: ({_id, ...body}) => ({
                url: `/lesson/?lesson_id=${_id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Courses', 'Lessons', 'Lesson']
        }),
        getFlowLesson: build.query<ILesson, {lessonId: string, flowId: string}>({
            query: (params) => ({
                url: '/lesson/flow',
                params
            })
        })
    }),
    overrideExisting: true
})

export const {
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useGetFlowLessonQuery
} = lessonAPI

export const {reducer, middleware} = lessonAPI
