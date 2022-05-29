import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILesson} from "../../../models/ILesson";

interface lessonState {
    open: boolean
    lesson: Partial<ILesson>
    titleError: boolean
    descriptionError: boolean
    isUpdate: boolean | undefined
}

const initialState: lessonState = {
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
        openModal: (state, action: PayloadAction<Partial<lessonState> | undefined>) => {
            state.open = true
            Object.assign(state, action.payload)
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
