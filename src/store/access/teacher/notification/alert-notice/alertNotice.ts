import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../notificationSlice";
import {fetchAlertNotice} from "./fetchAlertNotice";
import {AlertProps} from "antd/es/alert";

export interface AlertNoticeProps {
    type: AlertProps['type']
    title: string
    description: string
}

export interface AlertNoticeState {
    loading: boolean
    data: null | AlertNoticeProps
}

export const alertNoticeState = {
    loading: true,
    data: null
}

export const alertNoticeExtraReducers = (builder:ActionReducerMapBuilder<StateProps> ) => {
    builder.addCase(fetchAlertNotice.pending, (state) => {
        state.alertNotice.loading = true;
    })
    builder.addCase(fetchAlertNotice.fulfilled, (state, action) => {
        state.alertNotice.data = action.payload;
        state.alertNotice.loading = false;
    })
}