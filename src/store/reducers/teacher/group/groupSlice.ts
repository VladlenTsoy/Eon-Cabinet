import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchGroups} from "./fetchGroups";
import {updateGroup} from "./updateGroup";
import {createGroup} from "./createGroup";
import {deleteGroup} from "./deleteGroup";

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

interface StateProps {
    fetchLoading: boolean;
    group: GroupProps | null;
    isSaved: boolean;
    groups: GroupProps[];
    selectedStudentsId: number[];
}

const initialState: StateProps = {
    fetchLoading: false,
    group: null,
    groups: [],
    isSaved: false,
    selectedStudentsId: [],
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        changeGroup(state, action: PayloadAction<GroupProps>) {
            state.group = action.payload
        },
        changeIsSaved(state, action: PayloadAction<boolean>) {
            state.isSaved = action.payload
        },
        changeSelectedStudentsId(state, action: PayloadAction<number[]>) {
            state.selectedStudentsId = action.payload
        }
    },
    extraReducers: {
        [fetchGroups.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchGroups.fulfilled]: (state, action) => {
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
        }
    }
});

export const groupSelector = (state: TeacherState) => state.group;

export const {changeGroup, changeIsSaved, changeSelectedStudentsId} = groupSlice.actions;

export default groupSlice.reducer;
