import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../studentsSlice";
import {fetchStudent} from "./fetchStudent";
import {homeworkExtraReducers, homeworkState, HomeworkState} from "./homework/homework";
import {Student} from "../../../../../lib/types/teacher/Student";

export interface SelectedState {
    loading: boolean
    detail: Student | null
    error: any
    homework: HomeworkState
}

export const selectedState: SelectedState = {
    loading: false,
    detail: null,
    error: null,
    homework: homeworkState
}

export const selectedReducers = {
}

export const selectedExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    //
    builder.addCase(fetchStudent.pending, (state) => {
        state.selected.loading = true
    })
    builder.addCase(fetchStudent.fulfilled, (state, action) => {
        state.selected.detail = action.payload
        state.selected.loading = false
        state.selected.error = null
    })
    builder.addCase(fetchStudent.rejected, (state, action) => {
        if (action.error.name === "ConditionError") {
            // const studentId = action.meta.arg.studentId;
            // if (studentId)
            //     state.selected.detail = state.data.find((student) => student.id === studentId) || null;
            state.selected.error = null;
            state.selected.loading = false;
        } else if (action.error.name === 'Error') {
            state.selected.error = action.error;
            state.selected.loading = false;
        }
    })
    homeworkExtraReducers(builder)
}