import {GroupProps, StateProps} from "../groupSlice";
import {fetchGroups} from "./fetchGroups";
import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {updateGroup} from "./updateGroup";
import {createGroup} from "./createGroup";
import {deleteGroup} from "./deleteGroup";

export interface GroupsState {
    data: GroupProps[]
    loading: boolean
}

export const groupsState: GroupsState = {
    data: [],
    loading: false
}

export const groupsExtraReducers =  (builder: ActionReducerMapBuilder<StateProps>) => {
    // Загрузка групп
    builder.addCase(fetchGroups.pending, (state) => {
        state.groups.loading = true
    })
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups.data = action.payload || []
        state.groups.loading = false
    })

    builder.addCase(createGroup.pending, (state) => {
        state.groups.loading = true;
    })
    builder.addCase(createGroup.fulfilled, (state, action) => {
        if (action.payload?.id)
            state.groups.data = [...state.groups.data, action.payload];
        state.groups.loading = false;
    })

    builder.addCase(updateGroup.pending, (state) => {
        state.groups.loading = true;
    })
    builder.addCase(updateGroup.fulfilled, (state, action) => {
        if (action.payload?.id)
            state.groups.data = state.groups.data.map((group) => group.id === action.payload.id ? action.payload : group);
        state.groups.loading = false;
    })

    builder.addCase(deleteGroup.pending, (state) => {
        state.groups.loading = true;
    })
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups.data = state.groups.data.filter((group) => group.id !== action.payload)
        state.groups.loading = false
    })
}