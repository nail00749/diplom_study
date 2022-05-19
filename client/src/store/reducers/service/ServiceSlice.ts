import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface serviceState {
    showAlert: boolean,
    error: string,
    showUsersData: boolean
}


const initialState: serviceState = {
    showAlert: false,
    error: '',
    showUsersData: false
}

export const serviceSlice = createSlice({
        name: 'service',
        initialState,
        reducers: {
            showErrorAlert: (state, action: PayloadAction<string>) => {
                state.showAlert = true
                state.error = action.payload
            },
            hideErrorAlert: (state) => {
                state.error = ''
                state.showAlert = false
            },
            toggleUsersData: (state) => {
                state.showUsersData = !state.showUsersData
            }

        }
    }
)

export const {showErrorAlert, hideErrorAlert, toggleUsersData} = serviceSlice.actions

export default serviceSlice.reducer
