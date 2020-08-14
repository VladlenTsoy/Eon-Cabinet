import {GroupProps, StateProps} from "../groupSlice";
import {fetchGroups} from "./fetchGroups";
import {PayloadAction} from "@reduxjs/toolkit";
import {updateGroup} from "../group/updateGroup";
import {createGroup} from "../group/createGroup";
import {deleteGroup} from "../group/deleteGroup";

export interface GroupsState {
    data: GroupProps[]
    loading: boolean
}

export const groupsState: GroupsState = {
    data: [],
    loading: false
}

export const groupsExtraReducers = {
    // Загрузка групп
    [fetchGroups.pending]: (state: StateProps) => {
        state.groups.loading = true;
    },
    [fetchGroups.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps[]>) => {
        state.groups.data = action.payload || [];
        state.groups.loading = false;
    },

    // Создать
    [createGroup.pending]: (state: StateProps) => {
        state.groups.loading = true;
    },
    [createGroup.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps>) => {
        if (action.payload?.id)
            state.groups.data = [...state.groups.data, action.payload];
        state.groups.loading = false;
    },

    // Обновить
    [updateGroup.pending]: (state: StateProps) => {
        state.groups.loading = true;
    },
    [updateGroup.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps>) => {
        if (action.payload?.id)
            state.groups.data = state.groups.data.map((group) => group.id === action.payload.id ? action.payload : group);
        state.groups.loading = false;
    },

    // Удалить
    [deleteGroup.pending]: (state: StateProps) => {
        state.groups.loading = true;
    },
    [deleteGroup.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps["id"]>) => {
        state.groups.data = state.groups.data.filter((group) => group.id !== action.payload)
        state.groups.loading = false
    },
}