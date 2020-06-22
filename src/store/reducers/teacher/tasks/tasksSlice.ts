import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchTasks} from "./fetchTasks";

export interface TaskProps {
    id: number;
    title:string;
    image: string;
    discipline_id: number;
    block: boolean;
}

export interface StateProps {
    fetchLoading: boolean;
    all: TaskProps[]
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
        [fetchTasks.fulfilled]: (state, action: PayloadAction<TaskProps[]>) => {
            state.all = action.payload;
            state.fetchLoading = false;
        },
    }
});

export const tasksSelector = (state: TeacherState) => state.tasks;

export default tasksSlice.reducer;
