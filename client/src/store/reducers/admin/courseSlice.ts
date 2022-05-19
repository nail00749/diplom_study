import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface courseAdmin {
    open: boolean,
    title: string | null,
    titleError: boolean,
    description: string | null,
    descriptionError: boolean,
    isUpdate: boolean | undefined,
    id?: number
}

interface actionOpen {
    title: string | null
    description: string | null
    isUpdate?: boolean | undefined
    id?: number | undefined
}

const initialState: courseAdmin = {
    open: false,
    title: '',
    titleError: false,
    description: '',
    descriptionError: false,
    isUpdate: false
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
    errorTitleChange
} = courseAdminAPI.actions

export default courseAdminAPI.reducer
