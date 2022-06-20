import {baseAPI} from "./baseAPI";
import {IFlowResult} from "../models/IFlowResult";

export const userTestResultAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        passTest: build.mutation({
            query: ({id, ...body}) => ({
                url: `/result-flow/lesson-test/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['MyResult']
        }),
        setMark: build.mutation<IFlowResult, { resultId: string, response: any, testId: string }>({
            query: ({resultId, ...body}) => ({
                url: `/result-flow/test-mark/${resultId}`,
                method: 'PATCH',
                body
            })
        })
    }),
    overrideExisting: true
})

export const {
    usePassTestMutation,
    useSetMarkMutation
} = userTestResultAPI
