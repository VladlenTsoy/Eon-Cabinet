import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchTasks} from "./fetchTasks";

export interface TaskProps {
    id: number;
    title:string;
    image: string;
    discipline_id: number;
    block: number | null;
    homework: number| null;
}

export interface StateProps {
    fetchLoading: boolean;
    all: TaskProps[],
    homework: TaskProps[],
}

const initialState: StateProps = {
    fetchLoading: true,
    all: [],
    homework: []
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
            state.homework = action.payload.filter((task) => !task.homework && !task.block);
            state.fetchLoading = false;
        },
    }
});

export const tasksSelector = (state: TeacherState) => state.tasks;

export default tasksSlice.reducer;
