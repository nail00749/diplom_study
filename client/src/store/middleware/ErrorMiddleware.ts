import {
    MiddlewareAPI,
    isRejectedWithValue,
    Middleware,
} from '@reduxjs/toolkit'
import {showErrorAlert} from '../reducers/service/ServiceSlice'

export const rtqQueryError: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    const {dispatch} = api

    if (isRejectedWithValue(action)) {
        if (action.payload && action.payload.data && action.payload.data.message) {
            let msg: string
            if (Array.isArray(action.payload.data.message)) {
                msg = action.payload.data.message.join('\n')
            } else {
                msg = action.payload.data.message
            }
            dispatch(showErrorAlert(msg))
        }
    }

    return next(action)
}
