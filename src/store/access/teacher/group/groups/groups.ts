import {GroupProps, StateProps} from "../groupSlice";
import {fetchGroups} from "./fetchGroups";
import {PayloadAction} from "@reduxjs/toolkit";

export interface GroupsState {
    data: GroupProps[]
    loading: boolean
}

export const groupsState: GroupsState = {
    data: [],
    loading: false
}

export const groupsExtraReducers = {
    [fetchGroups.pending]: (state: StateProps) => {
        state.groups.loading = true;
    },
    [fetchGroups.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps[]>) => {
        state.groups.data = action.payload || [];
        state.groups.loading = false;
    },
}