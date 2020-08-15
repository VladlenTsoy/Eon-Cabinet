import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../homeworkSlice";
import {fetchTasksByHomeworkId} from "./fetchTasksByHomeworkId";

export interface TasksState {
    loading: boolean
    data: { [homeworkId: number]: any[] }
}

export const tasksState: TasksState = {
    loading: false,
    data: []
}

export const tasksExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchTasksByHomeworkId.pending, (state) => {
        state.tasks.loading = true
    })
    builder.addCase(fetchTasksByHomeworkId.fulfilled, (state, action) => {
        state.tasks.data[action.payload.homeworkId] = action.payload.tasks
        state.tasks.loading = false
    })
}