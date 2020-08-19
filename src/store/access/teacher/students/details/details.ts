import {fetchStudentsDetails} from "./fetchStudentsDetails";
import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../studentsSlice";
import {createStudent} from "./createStudent";
import {updateStudent} from "./updateStudent";
import {deleteStudent} from "./deleteStudent";
import {deleteStudents} from "./deleteStudents";
import {sendCoins} from "./sendСoins";
import {blockStudent} from "./blockStudent";
import {unblockStudent} from "./unblockStudent";
import {Student} from "../../../../../lib/types/teacher/Student";

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

export const detailsExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    // Создание ученика
    builder.addCase(createStudent.pending, (state) => {
        state.details.loading = true;
    })
    builder.addCase(createStudent.fulfilled, (state, action) => {
        if (action.payload?.id)
            state.details.data = [...state.details.data, action.payload];
        state.details.loading = false;
    })
    builder.addCase(createStudent.rejected, (state) => {
        state.details.loading = false;
    })

    // Обновление данных ученика
    builder.addCase(updateStudent.pending, (state) => {
        state.details.loading = true;
    })
    builder.addCase(updateStudent.fulfilled, (state, action) => {
        if (action.payload?.id)
            state.details.data = state.details.data.map((student) => student.id === action.payload.id ? action.payload : student);
        state.details.loading = false;
    })
    builder.addCase(updateStudent.rejected, (state) => {
        state.details.loading = false;
    })

    // Удаление ученика
    builder.addCase(deleteStudent.pending, (state) => {
        state.details.loading = true;
    })
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
        state.details.data = state.details.data.filter((student) => student.id !== action.payload);
        state.details.loading = false;
    })

    // Удаление учеников
    builder.addCase(deleteStudents.pending, (state) => {
        state.details.loading = true;
    })
    builder.addCase(deleteStudents.fulfilled, (state, action) => {
        state.details.data = state.details.data.filter((student) => !action.payload.includes(student.id));
        state.details.loading = false;
    })

    // Загрузка учеников
    builder.addCase(fetchStudentsDetails.pending, (state) => {
        state.details.loading = true;
    })
    builder.addCase(fetchStudentsDetails.fulfilled, (state, action) => {
        state.details.error = null;
        state.details.data = action.payload || [];
        state.details.loading = false;
    })

    // Отправка монет студенту
    builder.addCase(sendCoins.pending, (state) => {
        state.details.loading = true;
    })
    builder.addCase(sendCoins.fulfilled, (state, action) => {
        state.details.data.map((student) => {
            if (action.payload.ids.includes(student.id))
                student.coins += action.payload.coin
            return student
        })
        state.details.loading = false;
    })

    // Блокировка ученика
    builder.addCase(blockStudent.pending, (state) => {
        state.details.loading = true;
    })
    builder.addCase(blockStudent.fulfilled, (state, action) => {
        state.details.data.map((student) => {
            if (student.id === action.payload.studentId)
                student.is_blocked = true
            student.day_block = action.payload.data.day_block
            return student
        })
        state.details.loading = false;
    })

    // Разблокировка ученика
    builder.addCase(unblockStudent.pending, (state) => {
        state.details.loading = true;
    })
    builder.addCase(unblockStudent.fulfilled, (state, action) => {
        state.details.data.map((student) => {
            if (student.id === action.payload.studentId)
                student.day_block = null
            student.is_blocked = false
            student.day_unblock = action.payload.data.day_unblock
            return student
        })
        state.details.loading = false;
    })
}