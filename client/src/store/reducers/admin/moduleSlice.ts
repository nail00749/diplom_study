import {IModule} from "../../../models/IModule";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILesson} from "../../../models/ILesson";

interface moduleState {
    open: boolean,
    module: Partial<IModule>
    titleError: boolean
    descriptionError: boolean
    isUpdate: boolean | undefined
}

const initialState: moduleState = {
    open: false,
    module: {
        title: '',
        description: ''
    },
    titleError: false,
    descriptionError: false,
    isUpdate: false
}

export const moduleSlice = createSlice({
    name: 'moduleSlice',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Partial<moduleState> | undefined>) => {
            state.open = true
            Object.assign(state, action.payload)
        },
        closeModal: () => initialState,
        changeModule: (state, action: PayloadAction<Partial<IModule>>) => {
            state.module = action.payload
        },
        addLesson: (state, action: PayloadAction<ILesson>) => {
            if (!state.module.lessons) {
                state.module.lessons = []
            }
            state.module!.lessons.push(action.payload)
        },
        setLessons: (state, action: PayloadAction<any[]>) => {
            state.module.lessons = action.payload as ILesson[]
        },
    }
})

export const {
    openModal,
    closeModal,
    changeModule,
    addLesson,
    setLessons,
} = moduleSlice.actions

export default moduleSlice.reducer
