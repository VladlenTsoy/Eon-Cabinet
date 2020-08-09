import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {quickNoticeExtraReducers, quickNoticeState, QuickNoticeState} from "./quick-notice/quickNotice";

export interface StateProps {
    quickNotice: QuickNoticeState
}

export const initialState: StateProps = {
    quickNotice: quickNoticeState
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: {
        ...quickNoticeExtraReducers
    }
})

export const notificationSelector = (state: TeacherState) => state.notification;

export default notificationSlice.reducer;
