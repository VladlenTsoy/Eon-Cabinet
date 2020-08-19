import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../olympiadSlice";
import {fetchOlympiad} from "./fetchOlympiad";
import {studentsExtraReducers, StudentsProps, studentsState} from "./students/students";
import {Olympiad} from "../../../../../lib/types/teacher/Olympiad";

export interface DetailProps {
    loading: boolean
    data: Olympiad | null
    error: any
    students: StudentsProps
}

export const detailState: DetailProps = {
    loading: true,
    data: null,
    error: null,
    students: studentsState
}

export const detailExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchOlympiad.pending, (state) => {
        state.detail.loading = true;
    })
    builder.addCase(fetchOlympiad.fulfilled, (state, action) => {
        state.detail.data = action.payload;
        state.detail.loading = false;
    })
    studentsExtraReducers(builder)
}