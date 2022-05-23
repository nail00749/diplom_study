import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/dist/query/react";
import {BaseURL} from "../config";
import {
    fetchAuthError,
    fetchAuthLoading,
    fetchAuthSuccess,
} from "../store/reducers/user/UserSlice";
import {IUser} from "../models/IUser";

const baseQuery = retry(fetchBaseQuery({
    baseUrl: BaseURL + '/api',
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
}))

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: '/token',
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                dispatch(fetchAuthLoading())
                try {
                    const {data} = await queryFulfilled
                    dispatch(fetchAuthSuccess(data.access_token))
                } catch (e: any) {
                    dispatch(fetchAuthError((e.error && e.error.data && e.error.data.detail) || 'Oops, unknown error'))
                }
            }
        }),
        register: build.mutation({
            query: (body) => ({
                url: '/users',
                method: "POST",
                body
            }),
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/users',
                method: "PATCH",
                body
            }),
            invalidatesTags: ['User']
        }),
        getMeData: build.query<IUser, void>({
            query: () => '/users/me',
            providesTags: ['User']
        }),
        updateAvatar: build.mutation<IUser, FormData>({
            query: (body) => ({
                url: '/users/avatar',
                method: "PATCH",
                body
            }),
            invalidatesTags: ['User']
        }),
        getTeachersFromCourse: build.query<IUser[], string>({
            query: (courseId: string) => `/users/course-teacher/${courseId}`
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetMeDataQuery,
    useUpdateMutation,
    useUpdateAvatarMutation,
    useGetTeachersFromCourseQuery,
} = userAPI

export const {reducer, middleware} = userAPI
