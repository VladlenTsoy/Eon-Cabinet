import {createSlice} from '@reduxjs/toolkit'
import {StoreState} from "store";
import {quickNoticeExtraReducers, quickNoticeState, QuickNoticeState} from "./quick-notice/quickNotice";
import {alertNoticeExtraReducers, AlertNoticeState, alertNoticeState} from "./alert-notice/alertNotice";

export interface StateProps {
    quickNotice: QuickNoticeState
    alertNotice: AlertNoticeState
}

export const initialState: StateProps = {
    quickNotice: quickNoticeState,
    alertNotice: alertNoticeState,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        quickNoticeExtraReducers(builder)
        alertNoticeExtraReducers(builder)
    }
})

export const notificationSelector = (state: StoreState) => state.notification;

export default notificationSlice.reducer;
