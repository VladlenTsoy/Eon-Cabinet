import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {fetchStudentHomeworkPaginate} from "./fetchStudentHomeworkPaginate";
import {StateProps} from "../../studentsSlice";

export interface HomeworkState {
    loading: boolean
    // page: number
    // isMore: boolean
    data: any[]
}

export const homeworkState: HomeworkState = {
    loading: false,
    data: []
}

export const homeworkExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    // Загрузка групп
    builder.addCase(fetchStudentHomeworkPaginate.pending, (state) => {
        state.selected.homework.loading = true
    })
    builder.addCase(fetchStudentHomeworkPaginate.fulfilled, (state, action) => {
        state.selected.homework.data = action.meta.arg.page === 1 ? action.payload.data : [...state.selected.homework.data, ...action.payload.data]
        state.selected.homework.loading = false
    })
}