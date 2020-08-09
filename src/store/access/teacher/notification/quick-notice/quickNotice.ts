import {PayloadAction} from "@reduxjs/toolkit";
import {StateProps} from "../notificationSlice";
import {ButtonType} from "antd/es/button";
import {fetchQuickNotice} from "./fetchQuickNotice";

export interface QuickNoticeProps {
    image: string
    title: string
    text: string
    link: {
        to: string
        type: ButtonType
        text: string
    }
}

export interface QuickNoticeState {
    loading: boolean
    data: null | QuickNoticeProps
}

export const quickNoticeState = {
    loading: true,
    data: null
}

export const quickNoticeExtraReducers = {
    [fetchQuickNotice.pending]: (state: StateProps) => {
        state.quickNotice.loading = true;
    },
    [fetchQuickNotice.fulfilled]: (state: StateProps, action: PayloadAction<QuickNoticeProps>) => {
        state.quickNotice.data = action.payload;
        state.quickNotice.loading = false;
    },
}