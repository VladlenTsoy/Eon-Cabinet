import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../homeworkSlice";
import {fetchExercisesByHomeworkId} from "./fetchExercisesByHomeworkId";
import {Exercise} from "../../../../../lib/types/teacher/Homework";

export interface ExercisesState {
    loading: boolean
    data: { [homeworkId: number]: Exercise[] }
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