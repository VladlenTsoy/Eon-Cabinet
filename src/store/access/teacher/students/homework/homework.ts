import {fetchStudentsHomework} from "./fetchStudentsHomework";
import {PayloadAction} from "@reduxjs/toolkit";
import {StateProps} from "../studentsSlice";

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
    loading: boolean
    data: StudentHomework
    error: any
}

export const homeworkState: HomeworkState = {
    loading: false,
    data: [],
    error: null
}

export const homeworkExtraReducer = {
    [fetchStudentsHomework.pending]: (state: StateProps) => {
        state.homework.loading = true;
    },
    [fetchStudentsHomework.fulfilled]: (state: StateProps, action: PayloadAction<StudentHomework>) => {
        state.homework.data = action.payload || [];
        state.homework.loading = false;
    },
}