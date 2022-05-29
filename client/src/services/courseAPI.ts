import {baseAPI} from "./baseAPI";
import {ICourse} from "../models/ICourse";
import {IUserSubscription} from "../models/IUserSubscription";


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
                url: `/course/${_id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Course', 'Flow'],
        }),
        getAllCourses: build.query<ICourse[], void>({
            query: () => '/course',
            providesTags: ['Courses']
        }),
        getCourse: build.query<ICourse, string>({
            query: (id) => `/course/${id}`,
            providesTags: ['Course']
        }),
        getStudentCourses: build.query<IUserSubscription[], void>({
            query: () => '/user-subscription/course'
        })
    }),
    overrideExisting: true
})

export const {
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useGetAllCoursesQuery,
    useGetCourseQuery,
    useGetStudentCoursesQuery
} = courseAPI

export const {reducer, middleware} = courseAPI
