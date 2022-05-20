import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface serviceState {
    showAlert: boolean,
    error: string,
}


const initialState: serviceState = {
    showAlert: false,
    error: '',
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
      }
  }
)

export const {showErrorAlert, hideErrorAlert} = serviceSlice.actions

export default serviceSlice.reducer
