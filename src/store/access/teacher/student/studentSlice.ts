import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../store";
import {Student} from "../students/studentsSlice";
import {fetchStudent} from "./fetchStudent";
import {homeworkState, HomeworkState, homeworkExtraReducers} from "./homework/homework";

export interface StateProps {
    loading: boolean
    error: any
    detail: Student | null

    homework: HomeworkState
}

const initialState: StateProps = {
    loading: false,
    error: null,
    detail: null,
    homework: homeworkState
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        changeHomeworkPage(state, action: PayloadAction<number>) {
            state.homework.page = action.payload
        }
    },
    extraReducers: (builder) => {
        // Загрузка групп
        builder.addCase(fetchStudent.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchStudent.fulfilled, (state, action) => {
            state.detail = action.payload || []
            state.loading = false
            state.error = null
        })
        homeworkExtraReducers(builder)
    }
})

export const studentSelector = (state: TeacherState) => state.student;

export const {changeHomeworkPage} = studentSlice.actions;

export default studentSlice.reducer;