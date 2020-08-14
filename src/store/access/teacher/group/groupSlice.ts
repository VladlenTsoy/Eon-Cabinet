import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
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

        ...groupsExtraReducers,
        ...statisticExtraReducers
    }
});

export const groupSelector = (state: TeacherState) => state.group;

export const {changeIsSaved, changeSelectedStudentsId, resetGroupSlice} = groupSlice.actions;

export default groupSlice.reducer;
