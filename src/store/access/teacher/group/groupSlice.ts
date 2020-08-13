import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {updateGroup} from "./group/updateGroup";
import {createGroup} from "./group/createGroup";
import {deleteGroup} from "./group/deleteGroup";
import {fetchGroup} from "./group/fetchGroup";
import {statisticExtraReducers, statisticState, StatisticState} from "./statistic/statistic";
import {groupsExtraReducers, groupsState, GroupsState} from "./groups/groups";

export interface GroupProps {
    id: number;
    title: string;
    method_id: number;
    category: {
        id: number;
        title: string;
    };
    count: number;
    last_activity: string;
    created_at: string;
}

export interface StateProps {
    fetchError: null | any;
    fetchLoading: boolean;
    group: GroupProps | null;
    isSaved: boolean;
    selectedStudentsId: number[];

    groups: GroupsState;
    statistic: StatisticState
}

const initialState: StateProps = {
    fetchLoading: false,
    fetchError: null,
    group: null,
    isSaved: false,
    selectedStudentsId: [],

    groups: groupsState,
    statistic: statisticState
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        resetGroupSlice: () => initialState,
        changeIsSaved(state, action: PayloadAction<boolean>) {
            state.isSaved = action.payload
        },
        changeSelectedStudentsId(state, action: PayloadAction<number[]>) {
            state.selectedStudentsId = action.payload
        }
    },
    extraReducers: {
        [fetchGroup.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchGroup.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps>) => {
            state.fetchError = null;
            state.group = action.payload || [];
            state.fetchLoading = false;
        },
        [fetchGroup.rejected]: (state, action) => {
            if (action.error.name === "ConditionError") {
                const groupId = action.meta.arg.groupId;
                if (groupId) state.group = state.groups.data.find((group) => group.id === Number(groupId)) || null;
                state.fetchError = null;
            } else if (action.error.name === 'Error') {
                state.fetchError = action.error;
                state.fetchLoading = false;
            }
        },

        [updateGroup.pending]: (state) => {
            state.fetchLoading = true;
        },
        [updateGroup.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps>) => {
            if (action.payload?.id)
                state.groups.data = state.groups.data.map((group) => group.id === action.payload.id ? action.payload : group);
            state.fetchLoading = false;
        },
        [createGroup.pending]: (state) => {
            state.fetchLoading = true;
        },
        [createGroup.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps>) => {
            if (action.payload?.id)
                state.groups.data = [...state.groups.data, action.payload];
            state.fetchLoading = false;
        },
        [deleteGroup.pending]: (state) => {
            state.fetchLoading = true;
        },
        [deleteGroup.fulfilled]: (state: StateProps, action: PayloadAction<number>) => {
            state.groups.data = state.groups.data.filter((group) => group.id !== action.payload);
            state.fetchLoading = false;
        },
        ...groupsExtraReducers,
        ...statisticExtraReducers
    }
});

export const groupSelector = (state: TeacherState) => state.group;

export const {changeIsSaved, changeSelectedStudentsId, resetGroupSlice} = groupSlice.actions;

export default groupSlice.reducer;
