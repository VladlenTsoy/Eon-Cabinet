import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../../olympiadSlice";
import {fetchOlympiadStepStudents} from "./fetchOlympiadStudents";

export interface StudentsProps {
    loading: boolean
    data: any
    error: any
}

export const studentsState:StudentsProps = {
    loading: false,
    data: null,
    error: null
}

export const studentsExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchOlympiadStepStudents.pending, state => {
        state.detail.students.loading = true
    })
    builder.addCase(fetchOlympiadStepStudents.fulfilled, (state, action) => {
        state.detail.students.data = action.payload
        state.detail.students.loading = false
    })
    builder.addCase(fetchOlympiadStepStudents.rejected, state => {
        state.detail.students.loading = false
    })
}