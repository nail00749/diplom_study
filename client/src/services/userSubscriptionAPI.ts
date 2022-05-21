import {baseAPI} from "./baseAPI";
import {IUserSubscription} from "../models/IUserSubscription";

export const userSubscriptionAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createUserSubscription: build.mutation<IUserSubscription, any>({
            query: (body) => ({
                url: '/user-subscription',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Subscriptions']
        }),
        getAllUserSubscription: build.query<IUserSubscription[], void>({
            query: () => '/user-subscription',
            providesTags: ['Subscriptions']
        })
    }),
    overrideExisting: true
})

export const {
    useGetAllUserSubscriptionQuery,
    useCreateUserSubscriptionMutation,
} = userSubscriptionAPI

export const {reducer, middleware} = userSubscriptionAPI
