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
    maxRetries: 1,
    backoff: () => new Promise((resolve) => setTimeout(() => resolve(), 3000))
})


export const baseAPI = createApi({
    reducerPath: 'contentAPI',
    baseQuery: baseQuery,
    tagTypes: [
        'Courses', 'Course', 'Lessons', 'Lesson', 'Test',
        'Users', 'User', 'Flows', 'Subscriptions', 'Modules', 'Module', 'Flow',
        'MyResult'
    ],
    endpoints: () => ({}),
})
