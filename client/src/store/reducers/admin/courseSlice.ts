import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICourse} from "../../../models/ICourse";

interface courseState {
    open: boolean
    course: Partial<ICourse>
    titleError: boolean
    descriptionError: boolean
    isUpdate: boolean | undefined
    id?: string
}

interface actionOpen {
    title: string
    description: string
    isUpdate?: boolean | undefined
    id?: string | undefined
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
        openModal: (state, action: PayloadAction<actionOpen | undefined>) => {
            if (action.payload) {
                const {isUpdate, id} = action.payload
                state.isUpdate = isUpdate
                if (isUpdate) {
                    state.id = id
                }
            }
            state.open = true
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
