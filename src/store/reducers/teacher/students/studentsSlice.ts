import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../store";
import {fetchStudentsHomework} from "./fetchStudentsHomework";
import {createStudent} from "./createStudent";
import {updateStudent} from "./updateStudent";
import {deleteStudent} from "./deleteStudent";
import {deleteStudents} from "./deleteStudents";

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

export interface StudentHomework {
    id: number;
    level: number;
    homework_id: number;
    status: number;
    tasks: StudentHomeworkTask[];
    created_at: string;
}

export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string | null;
    login: string | null;
    date_of_birth: string | object | null;
    group_id: number;
    // students_id: number;
    image: string;
    is_blocked: boolean;
    day_block: number | null;
    day_unblock: number | null;
    homework: StudentHomework[];
}

interface StateProps {
    fetchLoading: boolean;
    fetchError: any;
    homework: Student[];
    data: Student[];
    selectedIds: Student['id'][],
}

const initialState: StateProps = {
    fetchLoading: true,
    fetchError: null,
    homework: [],
    data: [],
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
        [fetchStudentsHomework.pending]: (state: StateProps) => {
            state.fetchLoading = true;
        },
        [fetchStudentsHomework.fulfilled]: (state: StateProps, action: PayloadAction<Student[]>) => {
            state.fetchError = null;
            state.homework = action.payload || [];
            state.fetchLoading = false;
        },
        [createStudent.pending]: (state: StateProps) => {
            state.fetchLoading = true;
        },
        [createStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student>) => {
            if (action.payload?.id)
                state.homework = [...state.homework, action.payload];
            state.fetchLoading = false;
        },
        [updateStudent.pending]: (state: StateProps) => {
            state.fetchLoading = true;
        },
        [updateStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student>) => {
            if (action.payload?.id)
                state.homework = state.homework.map((student) => student.id === action.payload.id ? action.payload : student);
            state.fetchLoading = false;
        },
        [deleteStudent.pending]: (state) => {
            state.fetchLoading = true;
        },
        [deleteStudent.fulfilled]: (state: StateProps, action: PayloadAction<Student['id']>) => {
            state.homework = state.homework.filter((student) => student.id !== action.payload);
            state.fetchLoading = false;
        },
        [deleteStudents.pending]: (state) => {
            state.fetchLoading = true;
        },
        [deleteStudents.fulfilled]: (state: StateProps, action: PayloadAction<Student['id'][]>) => {
            state.homework = state.homework.filter((student) => !action.payload.includes(student.id));
            state.fetchLoading = false;
        }
    }
})

export const studentsSelector = (state: TeacherState) => state.students;

export const {changeSelectedIds} = studentsSlice.actions;

export default studentsSlice.reducer;
