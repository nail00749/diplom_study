import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react'
import {BaseURL} from "../config";

const baseQuery = retry(fetchBaseQuery({
    baseUrl: BaseURL + '/api',
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
}), {
    maxRetries: 2,
    backoff: (attempt, maxRetries) => new Promise((resolve) => setTimeout(() => resolve(), 50000))
})


export const baseAPI = createApi({
    reducerPath: 'contentAPI',
    baseQuery: baseQuery,
    tagTypes: ['Courses', 'Course', 'Lessons','Lesson', 'Test', 'Users', 'User'],
    endpoints: () => ({}),
})