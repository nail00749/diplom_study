import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/user/UserSlice'
import testReducer from './reducers/admin/testSlice'
import serviceReducer from './reducers/service/ServiceSlice'
import {userAPI} from "../services/userAPI";
import {emptyContentAPI} from "../services/emptyContentAPI";
import {rtqQueryError} from './middleware/ErrorMiddleware'
import courseAdminReducer from './reducers/admin/courseSlice'
import lessonAdminReducer from './reducers/admin/lessonSlice'

const rootReducer = combineReducers({
    userReducer,
    testReducer,
    serviceReducer,
    courseAdminReducer,
    lessonAdminReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [emptyContentAPI.reducerPath]: emptyContentAPI.reducer,

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware()
                .concat([
                    userAPI.middleware,
                    emptyContentAPI.middleware,
                    rtqQueryError,
                ])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
