import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../studentSlice";
import {fetchStudentHomeworkPaginate} from "./fetchStudentHomeworkPaginate";

export interface HomeworkState {
    loading: boolean
    page: number
    isMore: boolean
    data: any[]
}

export const homeworkState: HomeworkState  = {
    loading: false,
    page: 1,
    isMore: false,
    data: []
}

export const homeworkExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    // Загрузка групп
    builder.addCase(fetchStudentHomeworkPaginate.pending, (state) => {
        state.homework.loading = true
    })
    builder.addCase(fetchStudentHomeworkPaginate.fulfilled, (state, action) => {
        // state.homework.page = action.payload.current_page
        state.homework.isMore = action.payload.last_page > action.payload.current_page
        state.homework.data = [...state.homework.data, ...action.payload.data]
        state.homework.loading = false
    })
}