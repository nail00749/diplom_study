import {baseAPI} from "./baseAPI";
import {ICourse} from "../models/ICourse";


export const courseAPI = baseAPI.injectEndpoints({
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
        getAllCourses: build.query<ICourse[], void>({
            query: () => '/course',
            providesTags: ['Courses']
        }),
        getCourse: build.query<ICourse, string>({
            query: (id) => `/course/${id}`,
            providesTags: ['Course']
        }),
    }),
    overrideExisting: true
})

export const {
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useGetAllCoursesQuery,
    useGetCourseQuery,
} = courseAPI

export const {reducer, middleware} = courseAPI
