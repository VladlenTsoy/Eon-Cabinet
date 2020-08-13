import {fetchStudentsRecentHomework} from "./fetchStudentsRecentHomework";
import {PayloadAction} from "@reduxjs/toolkit";
import {StateProps} from "../studentSlice";

export interface RecentHomeworkDetails {
    id: number;
    student: {
        id: number;
        image: string;
        first_name: string;
        last_name: string;
        group: string;
        group_id: number;
    };
    level: number;
    status: number;
    sent_at: string;
}

export interface RecentHomeworkState {
    loading: boolean;
    data: RecentHomeworkDetails[];
}

export const recentHomeworkState: RecentHomeworkState = {
    loading: false,
    data: []
}

export const recentHomeworkExtraReducers = {
    //
    [fetchStudentsRecentHomework.pending]: (state:StateProps) => {
        state.recentHomework.loading = true;
    },
    //
    [fetchStudentsRecentHomework.fulfilled]: (state: StateProps, action: PayloadAction<any[]>) => {
        state.recentHomework.data = action.payload || [];
        state.recentHomework.loading = false;
    },
}