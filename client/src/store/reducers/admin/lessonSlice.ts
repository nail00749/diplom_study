import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICourse} from "../../../models/ICourse";
import {ILesson} from "../../../models/ILesson";

interface lessonAdmin {
    open: boolean
    title: string | null
    titleError: boolean
    description: string | null
    descriptionError: boolean
    course: ICourse | null
    courseError: boolean
    isUpdate: boolean | undefined
    id?: string
}

interface actionOpen {
    lesson: ILesson
    isUpdate?: boolean | undefined
    courses?: ICourse[] | null | undefined
}

const initialState: lessonAdmin = {
    open: false,
    title: '',
    titleError: false,
    description: '',
    descriptionError: false,
    isUpdate: false,
    course: null,
    courseError: false
}


export const lessonAdminAPI = createSlice({
    name: 'lessonAdminAPI',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<actionOpen | undefined>) => {
            if (action.payload) {
                const {lesson, isUpdate,courses} = action.payload
                state.isUpdate = isUpdate
                if (isUpdate) {
                    state.title = lesson.title
                    state.description = lesson.description
                    state.id = lesson._id
                    const course = courses?.find(i => i._id === lesson.course)
                    state.course = course as ICourse
                }
            }
            state.open = true
        },
        closeModal: () => initialState,
        changeTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
            state.titleError = false
        },
        changeDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
            state.descriptionError = false
        },
        errorTitleChange: (state) => {
            state.titleError = true
        },
        errorDescriptionChange: (state) => {
            state.descriptionError = true
        },
        changeCourse: (state, action: PayloadAction<ICourse | null>) => {
            state.course = action.payload
            state.courseError = false
        },
        errorCourseChange: (state) => {
            state.courseError = true
        }
    }
})

export const {
    openModal,
    closeModal,
    changeTitle,
    changeDescription,
    errorDescriptionChange,
    errorTitleChange,
    changeCourse,
    errorCourseChange
} = lessonAdminAPI.actions

export default lessonAdminAPI.reducer
