import {fetchStudentsHomework} from "./fetchStudentsHomework";
import {PayloadAction} from "@reduxjs/toolkit";
import {StateProps} from "../studentsSlice";
import {fetchStudentsHomeworkDates} from "./fetchStudentsHomeworkDates";

export interface StudentHomeworkTask {
    task_name: string;
    first: {
        count_success: number;
        exodus: boolean;
        view: number;
        created_at: number;
    }
    count_all: number;
    created_at: string;
}

export interface Homework {
    id: number;
    level: number;
    homework_id: number;
    status: number;
    tasks: StudentHomeworkTask[];
    user_id: number;
    created_at: string;
}

export type StudentHomework = { [user_id: number]: Homework[] }

export interface HomeworkState {
    weekState: number;
    loading: boolean
    data: StudentHomework
    dates: any
    error: any
}

export const homeworkState: HomeworkState = {
    weekState: 0,
    loading: false,
    data: [],
    dates: [],
    error: null
}

export const homeworkReducer = {
    changeWeekState: (state: StateProps, action: PayloadAction<HomeworkState["weekState"]>) => {
        state.homework.weekState = action.payload
    }
}

export const homeworkExtraReducer = {
    [fetchStudentsHomework.pending]: (state: StateProps) => {
        state.homework.loading = true;
    },
    [fetchStudentsHomework.fulfilled]: (state: StateProps, action: PayloadAction<StudentHomework>) => {
        state.homework.data = action.payload || [];
        state.homework.loading = false;
    },

    [fetchStudentsHomeworkDates.pending]: (state: StateProps) => {
        state.homework.loading = true;
    },
    [fetchStudentsHomeworkDates.fulfilled]: (state: StateProps, action: PayloadAction<any>) => {
        state.homework.dates = action.payload || [];
        state.homework.loading = false;
    },
}