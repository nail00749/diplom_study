import {baseAPI} from "./baseAPI";
import {IUserSubmission} from "../models/IUserSubmission";

export const userTestResultAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getMyTestResult: build.query<IUserSubmission, string>({
            query: (testId) => `/test/my-result/${testId}`
        }),
        passTest: build.mutation({
            query: ({id, ...other}) => ({
                url: `/test/finish`,
                method: 'POST',
                body: other,
            }),
            invalidatesTags: ['Lesson']
        }),
        getStudentsResult: build.query<any, { testId: string, flowId: string }>({
            query: ({testId, flowId}) => `/test/teacher/results/${testId}/${flowId}`
        }),
        setMark: build.mutation<any, { resultId: string, result: string }>({
            query: ({resultId, ...body}) => ({
                url: `/test/mark/${resultId}`,
                method: 'PATCH',
                body
            })
        })
    }),
    overrideExisting: true
})

export const {
    useGetMyTestResultQuery,
    usePassTestMutation,
    useGetStudentsResultQuery,
    useSetMarkMutation
} = userTestResultAPI
