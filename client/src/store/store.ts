import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {rtqQueryError} from './middleware/ErrorMiddleware'
import userReducer from './reducers/user/UserSlice'
import testReducer from './reducers/admin/testSlice'
import serviceReducer from './reducers/service/ServiceSlice'
import modalReducer from './reducers/modals/modalsSlice'
import courseAdminReducer from './reducers/admin/courseSlice'
import lessonAdminReducer from './reducers/admin/lessonSlice'
import {userAPI} from "../services/userAPI";
import {baseAPI} from "../services/baseAPI";

const rootReducer = combineReducers({
    userReducer,
    testReducer,
    serviceReducer,
    courseAdminReducer,
    lessonAdminReducer,
    modalReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
})

const appReducer = (state: any, action: any) => {
    if (action.type === 'logOut') {
        console.log(111)
        localStorage.clear()
        sessionStorage.clear()
        state = undefined
    }
    return rootReducer(state, action)
}

export const store = configureStore({
    reducer: appReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat([
                userAPI.middleware,
                baseAPI.middleware,
                rtqQueryError,
            ])
})


export type RootState = ReturnType<typeof store.getState>
//export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
