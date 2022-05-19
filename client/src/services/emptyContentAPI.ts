import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BaseURL} from "../config";

export const emptyContentAPI = createApi({
    reducerPath: 'contentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseURL,
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Course', 'Lesson', 'Test', 'Users', 'User'],
    endpoints: () => ({}),
})
