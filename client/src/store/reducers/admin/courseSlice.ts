import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface courseState {
    open: boolean
    title: string
    titleError: boolean
    description: string
    descriptionError: boolean
    isUpdate: boolean | undefined
    id?: string
    file?: any
}

interface actionOpen {
    title: string
    description: string
    isUpdate?: boolean | undefined
    id?: string | undefined
}

const initialState: courseState = {
    open: false,
    title: '',
    titleError: false,
    description: '',
    descriptionError: false,
    isUpdate: false,
    file: null
}


export const courseAdminAPI = createSlice({
    name: 'courseAdminAPI',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<actionOpen | undefined>) => {
            if (action.payload) {
                const {title, description, isUpdate, id} = action.payload
                state.isUpdate = isUpdate
                if (isUpdate) {
                    state.title = title
                    state.description = description
                    state.id = id
                }
            }
            state.open = true
        },
        closeModal: () => initialState,
        changeName: (state, action: PayloadAction<string>) => {
            state.title = action.payload
            state.titleError = false
        },
        changeDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
            state.descriptionError = false
        },
        changeFile: (state, action: PayloadAction<any>) => {
            state.file = action.payload
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
    changeName: changeTitle,
    changeDescription,
    errorDescriptionChange,
    errorTitleChange,
    changeFile
} = courseAdminAPI.actions

export default courseAdminAPI.reducer
