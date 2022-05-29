import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICourse} from "../../../models/ICourse";

interface courseState {
    open: boolean
    course: Partial<ICourse>
    titleError: boolean
    descriptionError: boolean
    isUpdate: boolean | undefined
}

const initialState: courseState = {
    open: false,
    course: {
        title: '',
        description: ''
    },
    titleError: false,
    descriptionError: false,
    isUpdate: false,
}


export const courseSlice = createSlice({
    name: 'courseAdminAPI',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Partial<courseState> | undefined>) => {
            state.open = true
            Object.assign(state, action.payload)
        },
        closeModal: () => initialState,
        changeCourse: (state, action: PayloadAction<Partial<ICourse>>) => {
            state.course = action.payload
        },
        errorTitleChange: (state) => {
            state.titleError = true
        },
        errorDescriptionChange: (state) => {
            state.descriptionError = true
        }
    }
})

export const {
    openModal,
    closeModal,
    errorDescriptionChange,
    errorTitleChange,
    changeCourse
} = courseSlice.actions

export default courseSlice.reducer
