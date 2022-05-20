import {baseAPI} from "./baseAPI";
import {IUserSubmission} from "../models/IUserSubmission";

export const userSubmissionAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getSubmission: build.query<IUserSubmission, string>({
            query: () => ({url: '', params: {}})
        }),
        passTest: build.mutation({
            query: ({id, ...other}) => ({
                url: `/test/finish/${id}`,
                method: 'POST',
                body: other,
            }),
        }),
    }),
    overrideExisting: true
})

export const {
    useGetSubmissionQuery,
    usePassTestMutation
} = userSubmissionAPI
