import {createSlice, PayloadAction} from "@reduxjs/toolkit";



interface modalState {
    userFlowOpen: boolean
    userSubscriptionOpen: boolean
}

const initialState: modalState = {
    userFlowOpen: false,
    userSubscriptionOpen: false
}


export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openUserFlow: state => {
            state.userFlowOpen = true
        },
        closeUserFlow: state => {
            state.userFlowOpen = false
        },
        openUserSubscription: state => {
            state.userSubscriptionOpen = true
        },
        closeUserSubscription: state => {
            state.userSubscriptionOpen = false
        },
    }
})

export const {
    openUserFlow,
    closeUserFlow,
    openUserSubscription,
    closeUserSubscription

} = modalsSlice.actions

export default modalsSlice.reducer
