import {ICourse} from "../models/ICourse";
import {baseAPI} from "./baseAPI";
import {ILesson} from "../models/ILesson";
import {ISubscription} from "../models/ISubscription";


export const contentAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getAllCourses: build.query<ICourse[], void>({
            query: () => '/course',
            providesTags: ['Courses']
        }),
        getCourse: build.query<ICourse, string>({
            query: (id) => `/course/${id}`,
            providesTags: ['Course']
        }),
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
    useGetAllCoursesQuery,
    useGetCourseQuery,
    useGetAllLessonsQuery,
    useGetLessonQuery,
    useGetAllSubscribesQuery,
} = contentAPI

export const {reducer, middleware} = contentAPI
