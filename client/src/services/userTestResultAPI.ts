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
            invalidatesTags: ['Course']
        }),
    }),
    overrideExisting: true
})

export const {
    useGetMyTestResultQuery,
    usePassTestMutation
} = userTestResultAPI
