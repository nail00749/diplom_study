import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICourse} from "../../../models/ICourse";
import {ILesson} from "../../../models/ILesson";

interface lessonAdmin {
    open: boolean
    lesson: Partial<ILesson>
    titleError: boolean
    descriptionError: boolean
    isUpdate: boolean | undefined
    id?: string
}

interface actionOpen {
    lesson: ILesson
    isUpdate?: boolean | undefined
}

const initialState: lessonAdmin = {
    open: false,
    lesson: {
        title: '',
        description: ''
    },
    titleError: false,
    descriptionError: false,
    isUpdate: false,
}


export const lessonSlice = createSlice({
    name: 'lessonAdminAPI',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<actionOpen | undefined>) => {
            if (action.payload) {
                const {lesson, isUpdate} = action.payload
                state.isUpdate = isUpdate
                if (isUpdate) {
                    state.id = lesson._id
                }
            }
            state.open = true
        },
        closeModal: () => initialState,
        changeLesson: (state, action: PayloadAction<Partial<ILesson>>) => {
            state.lesson = action.payload
        },
        errorTitleChange: (state) => {
            state.titleError = true
        },
        errorDescriptionChange: (state) => {
            state.descriptionError = true
        },
    }
})

export const {
    openModal,
    closeModal,
    changeLesson,
    errorDescriptionChange,
    errorTitleChange,
} = lessonSlice.actions

export default lessonSlice.reducer
