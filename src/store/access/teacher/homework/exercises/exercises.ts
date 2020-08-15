import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {ExerciseProps, StateProps} from "../homeworkSlice";
import {fetchExercisesByHomeworkId} from "./fetchExercisesByHomeworkId";

export interface ExercisesState {
    loading: boolean
    data: { [homeworkId: number]: ExerciseProps[] }
}

export const exercisesState: ExercisesState = {
    loading: false,
    data: []
}

export const tasksExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchExercisesByHomeworkId.pending, (state) => {
        state.exercises.loading = true
    })
    builder.addCase(fetchExercisesByHomeworkId.fulfilled, (state, action) => {
        state.exercises.data[action.payload.homeworkId] = action.payload.exercises
        state.exercises.loading = false
    })
}