import {baseAPI} from "./baseAPI";
import {ILesson} from "../models/ILesson";
import {IUserSubscription} from "../models/IUserSubscription";

export const lessonAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createLesson: build.mutation<ILesson, FormData>({
            query: (body) => ({
                url: '/lesson',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Lessons']
        }),
        updateLesson: build.mutation<ILesson, { body: FormData, _id: string }>({
            query: ({body, _id}) => ({
                url: `/lesson/${_id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Courses', 'Lessons', 'Lesson']
        }),
        getFlowLesson: build.query<{ lesson: ILesson, subscriptions: IUserSubscription[] }, { lessonId: string, flowId: string }>({
            query: ({lessonId, flowId}) => ({
                url: `/lesson/teacher/${lessonId}/${flowId}`,
            })
        }),
    }),
    overrideExisting: true
})

export const {
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useGetFlowLessonQuery
} = lessonAPI

export const {reducer, middleware} = lessonAPI
