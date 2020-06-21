import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchTasks} from "./fetchTasks";

export interface StateProps {
    fetchLoading: boolean;
    all: any[]
}

const initialState: StateProps = {
    fetchLoading: false,
    all: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTasks.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchTasks.fulfilled]: (state, action: PayloadAction<any[]>) => {
            state.all = action.payload;
            state.fetchLoading = false;
        },
    }
});

export const tasksSelector = (state: TeacherState) => state.tasks;

export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
