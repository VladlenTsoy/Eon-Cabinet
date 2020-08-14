import {GroupProps, StateProps} from "../groupSlice";
import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {fetchGroup} from "./fetchGroup";

export interface GroupState {
    loading: boolean
    detail: GroupProps | null
    error: any
}

export const groupState: GroupState = {
    loading: false,
    detail: null,
    error: null
}

export const groupExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchGroup.pending, (state) => {
        state.group.loading = true
    })
    builder.addCase(fetchGroup.fulfilled, (state, action) => {
        state.group.error = null;
        state.group.detail = action.payload;
        state.group.loading = false;
    })
    builder.addCase(fetchGroup.rejected, (state, action) => {
        if (action.error.name === "ConditionError") {
            const groupId = action.meta.arg.groupId;
            if (groupId) state.group.detail = state.groups.data.find((group) => group.id === Number(groupId)) || null;
            state.group.error = null;
        } else if (action.error.name === 'Error') {
            state.group.error = action.error;
            state.group.loading = false;
        }
    })
}