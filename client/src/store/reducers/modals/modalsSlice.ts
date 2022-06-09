import {createSlice} from "@reduxjs/toolkit";

interface modalState {
    userFlowOpen: boolean
    userSubscriptionOpen: boolean
    moduleTaskOpen: boolean
}

const initialState: modalState = {
    userFlowOpen: false,
    userSubscriptionOpen: false,
    moduleTaskOpen: false
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
        openModuleTask: state => {
            state.moduleTaskOpen = true
        },
        closeModuleTask: state => {
            state.moduleTaskOpen = false
        }
    }
})

export const {
    openUserFlow,
    closeUserFlow,
    openUserSubscription,
    closeUserSubscription,
    openModuleTask,
    closeModuleTask
} = modalsSlice.actions

export default modalsSlice.reducer
