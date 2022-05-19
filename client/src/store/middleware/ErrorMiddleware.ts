import {
    MiddlewareAPI,
    isRejectedWithValue,
    Middleware,
} from '@reduxjs/toolkit'
import {showErrorAlert} from '../reducers/service/ServiceSlice'
import {logOut} from "../reducers/user/UserSlice";


export const rtqQueryError: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    const {dispatch} = api

    if (isRejectedWithValue(action)) {
        if (action.payload.status === 422) {
            dispatch(showErrorAlert(action.payload.data.detail[0].msg))
        } else {
            dispatch(showErrorAlert(action.payload.data.detail))
        }
        if (action.payload.status === 401) {
            dispatch(logOut())
        }


    }

    return next(action)
}
