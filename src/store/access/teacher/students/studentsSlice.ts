import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../store";
import {fetchStudentsHomework} from "./fetchStudentsHomework";
import {createStudent} from "./createStudent";
import {updateStudent} from "./updateStudent";
import {deleteStudent} from "./deleteStudent";
import {deleteStudents} from "./deleteStudents";
import {fetchStudentsDetails} from "./fetchStudentsDetails";

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

export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string | null;
    login: string | null;
    date_of_birth: string | object | null;
    group_id: number;
    image: string;
    is_blocked: boolean;
    day_block: number | null;
    day_unblock: number | null;
}

interface StateProps {
    fetchLoading: boolean;
    fetchHomeworkLoading: boolean;
    fetchError: any;
    homework: StudentHomework;
    details: Student[];
    selectedIds: Student['id'][],
}

const initialState: StateProps = {
    fetchLoading: true,
    fetchHomeworkLoading: true,
    fetchError: null,
    homework: [],
    details: [],
    selectedIds: [],
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        changeSelectedIds(state: StateProps, action: PayloadAction<StateProps['selectedIds']>) {
            state.selectedIds = action.payload;
        }
    },
    extraReducers: {
        [fetchStudentsDetails.pending]: (state: StateProps) => {
            state.fetchLoading = true;
        },
        [fetchStudentsDetails.fulfilled]: (state: StateProps, action: PayloadAction<Student[]>) => {
            state.fetchError = null;
            state.details = action.payload || [];
            state.fetchLoading = false;
        },
        [fetchStudentsHomework.pending]: (state: StateProps) => {
            state.fetchHomeworkLoading = true;
        },
        [fetchStudentsHomework.fulfilled]: (state: StateProps, action: PayloadAction<StudentHomework>) => {
            state.homework = action.payload || [];
            state.fetchHomeworkLoading = false;
        },
        [createStudent.pending]: (state: StateProps) => {
            state.fetchLoading = true;
        },
        [createStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student>) => {
            if (action.payload?.id)
                state.details = [...state.details, action.payload];
            state.fetchLoading = false;
        },
        [updateStudent.pending]: (state: StateProps) => {
            state.fetchLoading = true;
        },
        [updateStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student>) => {
            if (action.payload?.id)
                state.details = state.details.map((student) => student.id === action.payload.id ? action.payload : student);
            state.fetchLoading = false;
        },
        [deleteStudent.pending]: (state) => {
            state.fetchLoading = true;
        },
        [deleteStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student['id']>) => {
            state.details = state.details.filter((student) => student.id !== action.payload);
            state.fetchLoading = false;
        },
        [deleteStudents.pending]: (state) => {
            state.fetchLoading = true;
        },
        [deleteStudents.fulfilled]: (state: StateProps, action: PayloadAction<Student['id'][]>) => {
            state.details = state.details.filter((student) => !action.payload.includes(student.id));
            state.fetchLoading = false;
        }
    }
})

export const studentsSelector = (state: TeacherState) => state.students;

export const {changeSelectedIds} = studentsSlice.actions;

export default studentsSlice.reducer;
