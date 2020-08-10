import {PayloadAction} from "@reduxjs/toolkit";
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

export const alertNoticeExtraReducers = {
    [fetchAlertNotice.pending]: (state: StateProps) => {
        state.alertNotice.loading = true;
    },
    [fetchAlertNotice.fulfilled]: (state: StateProps, action: PayloadAction<AlertNoticeProps>) => {
        state.alertNotice.data = action.payload;
        state.alertNotice.loading = false;
    },
}