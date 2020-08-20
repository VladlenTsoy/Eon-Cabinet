import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../notificationSlice";
import {fetchQuickNotice} from "./fetchQuickNotice";
import {QuickNotice} from "../../../../../lib/types/teacher/Notification";

export interface QuickNoticeState {
    loading: boolean
    data: null | QuickNotice
}

export const quickNoticeState = {
    loading: true,
    data: null
}

export const quickNoticeExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchQuickNotice.pending, (state) => {
        state.quickNotice.loading = true;
    })
    builder.addCase(fetchQuickNotice.fulfilled, (state, action) => {
        state.quickNotice.data = action.payload;
        state.quickNotice.loading = false;
    })
}