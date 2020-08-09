import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchGroups} from "./fetchGroups";
import {updateGroup} from "./updateGroup";
import {createGroup} from "./createGroup";
import {deleteGroup} from "./deleteGroup";
import {fetchGroup} from "./fetchGroup";
import {statisticExtraReducers, statisticState, StatisticState} from "./statistic/statistic";

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
    groups: GroupProps[];
    selectedStudentsId: number[];
    statistic: StatisticState
}

const initialState: StateProps = {
    fetchLoading: false,
    fetchError: null,
    group: null,
    groups: [],
    isSaved: false,
    selectedStudentsId: [],
    statistic: statisticState
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
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
                if (groupId) state.group = state.groups.find((group) => group.id === Number(groupId)) || null;
                state.fetchError = null;
            } else if (action.error.name === 'Error') {
                state.fetchError = action.error;
                state.fetchLoading = false;
            }
        },
        [fetchGroups.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchGroups.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps[]>) => {
            state.groups = action.payload || [];
            state.fetchLoading = false;
        },
        [updateGroup.pending]: (state) => {
            state.fetchLoading = true;
        },
        [updateGroup.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps>) => {
            if (action.payload?.id)
                state.groups = state.groups.map((group) => group.id === action.payload.id ? action.payload : group);
            state.fetchLoading = false;
        },
        [createGroup.pending]: (state) => {
            state.fetchLoading = true;
        },
        [createGroup.fulfilled]: (state: StateProps, action: PayloadAction<GroupProps>) => {
            if (action.payload?.id)
                state.groups = [...state.groups, action.payload];
            state.fetchLoading = false;
        },
        [deleteGroup.pending]: (state) => {
            state.fetchLoading = true;
        },
        [deleteGroup.fulfilled]: (state: StateProps, action: PayloadAction<number>) => {
            state.groups = state.groups.filter((group) => group.id !== action.payload);
            state.fetchLoading = false;
        },
        ...statisticExtraReducers
    }
});

export const groupSelector = (state: TeacherState) => state.group;

export const {changeIsSaved, changeSelectedStudentsId} = groupSlice.actions;

export default groupSlice.reducer;
