import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string,
    token: ''
    saveSession: boolean
}

const initialState: UserState = {
    isAuthenticated: Boolean(sessionStorage.getItem('token')) || Boolean(localStorage.getItem('token')),
    isLoading: false,
    error: '',
    token: '',
    saveSession: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchAuthLoading: (state) => {
            state.isLoading = true
        },
        fetchAuthError: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        fetchAuthSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = ''
            state.isAuthenticated = true
            sessionStorage.setItem('token', action.payload)
            if (state.saveSession) {
                localStorage.setItem('token', action.payload)
            }
        },
        setSaveSession: (state) => {
            state.saveSession = !state.saveSession
        },
        logOut: () => {
            localStorage.clear()
            sessionStorage.clear()
            return {
                ...initialState,
                isAuthenticated: false
            }
        }
    }
})

export const {
    fetchAuthSuccess,
    fetchAuthLoading,
    fetchAuthError,
    logOut,
    setSaveSession
} = userSlice.actions

export default userSlice.reducer
