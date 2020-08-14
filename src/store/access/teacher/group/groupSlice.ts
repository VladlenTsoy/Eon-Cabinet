import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {statisticExtraReducers, statisticState, StatisticState} from "./statistic/statistic";
import {groupsExtraReducers, groupsState, GroupsState} from "./groups/groups";
import {groupExtraReducers, GroupState, groupState} from "./group/group";

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
    isSaved: boolean;
    selectedStudentsId: number[];

    group: GroupState
    groups: GroupsState;
    statistic: StatisticState
}

const initialState: StateProps = {
    isSaved: false,
    selectedStudentsId: [],

    group: groupState,
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
    extraReducers: (builder) => {
        groupExtraReducers(builder)
        groupsExtraReducers(builder)
        statisticExtraReducers(builder)
    }
});

export const groupSelector = (state: TeacherState) => state.group;

export const {changeIsSaved, changeSelectedStudentsId, resetGroupSlice} = groupSlice.actions;

export default groupSlice.reducer;
