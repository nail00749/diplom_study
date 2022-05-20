import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/user/UserSlice'
import testReducer from './reducers/admin/testSlice'
import serviceReducer from './reducers/service/ServiceSlice'
import {userAPI} from "../services/userAPI";
import {baseAPI} from "../services/baseAPI";
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
  [baseAPI.reducerPath]: baseAPI.reducer,

})

export const store = configureStore({
  reducer: rootReducer,
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
