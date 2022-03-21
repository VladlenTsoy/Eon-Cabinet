import {createSlice} from '@reduxjs/toolkit'
import {StoreState} from "store";
import {fetchTasks} from "./fetchTasks";
import {Task} from "../../lib/types/teacher/Task";

export interface StateProps {
    fetchLoading: boolean;
    all: Task[],
    homework: Task[],
}

const initialState: StateProps = {
    fetchLoading: true,
    all: [],
    homework: []
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        resetTasksSlice: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, state => {
            state.fetchLoading = true;
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.all = action.payload;
            state.homework = action.payload.filter((task) => !task.homework && !task.block);
            state.fetchLoading = false;
        })
    }
});

export const tasksSelector = (state: StoreState) => state.tasks;

export const {resetTasksSlice} = tasksSlice.actions;

export default tasksSlice.reducer;
