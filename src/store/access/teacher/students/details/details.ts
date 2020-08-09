import {fetchStudentsDetails} from "./fetchStudentsDetails";
import {PayloadAction} from "@reduxjs/toolkit";
import {StateProps, Student} from "../studentsSlice";
import {createStudent} from "./createStudent";
import {updateStudent} from "./updateStudent";
import {deleteStudent} from "./deleteStudent";
import {deleteStudents} from "./deleteStudents";

export interface DetailsState {
    data: Student[]
    loading: boolean
    error: any
}

export const detailsState: DetailsState = {
    data: [],
    loading: true,
    error: null
}

export const detailsExtraReducers = {
    //
    [createStudent.pending]: (state: StateProps) => {
        state.details.loading = true;
    },
    [createStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student>) => {
        if (action.payload?.id)
            state.details.data = [...state.details.data, action.payload];
        state.details.loading = false;
    },
    //
    [updateStudent.pending]: (state: StateProps) => {
        state.details.loading = true;
    },
    [updateStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student>) => {
        if (action.payload?.id)
            state.details.data = state.details.data.map((student) => student.id === action.payload.id ? action.payload : student);
        state.details.loading = false;
    },
    //
    [deleteStudent.pending]: (state: StateProps) => {
        state.details.loading = true;
    },
    [deleteStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student['id']>) => {
        state.details.data = state.details.data.filter((student) => student.id !== action.payload);
        state.details.loading = false;
    },
    //
    [deleteStudents.pending]: (state: StateProps) => {
        state.details.loading = true;
    },
    [deleteStudents.fulfilled]: (state: StateProps, action: PayloadAction<Student['id'][]>) => {
        state.details.data = state.details.data.filter((student) => !action.payload.includes(student.id));
        state.details.loading = false;
    },
    //
    [fetchStudentsDetails.pending]: (state: StateProps) => {
        state.details.loading = true;
    },
    [fetchStudentsDetails.fulfilled]: (state: StateProps, action: PayloadAction<Student[]>) => {
        state.details.error = null;
        state.details.data = action.payload || [];
        state.details.loading = false;
    },
}