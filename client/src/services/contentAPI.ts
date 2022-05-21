import {ICourse} from "../models/ICourse";
import {baseAPI} from "./baseAPI";
import {ILesson} from "../models/ILesson";
import {IUserSubscription} from "../models/IUserSubscription";


export const contentAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({

        getAllLessons: build.query<ILesson[], void>({
            query: () => '/lesson',
            providesTags: () => ['Lessons']
        }),
        getLesson: build.query<ILesson, string>({
            query: (id) => `/lesson/${id}`,
            providesTags: () => ['Lesson']
        }),
        getAllSubscribes: build.query<ICourse[], void>({
            query: () => '/course'
        })
    }),
    overrideExisting: true
})


export const {
    useGetAllLessonsQuery,
    useGetLessonQuery,
    useGetAllSubscribesQuery,
} = contentAPI

export const {reducer, middleware} = contentAPI
