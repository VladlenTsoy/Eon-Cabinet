import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {TeacherState} from "../store"
import {Student} from "../../../../lib/types/teacher/Student"
import {fetchStudents} from "./fetchStudents"
import {Group} from "../../../../lib/types/teacher/Group"
import {createStudent} from "./createStudent"
import {updateStudent} from "./updateStudent"
import {deleteStudent} from "./deleteStudent"
import {sendCoins} from "./sendСoins"
import {blockStudent} from "./blockStudent"
import {unblockStudent} from "./unblockStudent"

export const studentAdapter = createEntityAdapter<Student>()

export interface StateProps {
    loading: boolean
    selectedIds: any
}

const initialState = studentAdapter.getInitialState<StateProps>({
    loading: true,
    selectedIds: [],
})

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        resetStudentSlice: () => initialState,
        changeSelectedIds(state: StateProps, action: PayloadAction<{groupId: Group["id"], ids: StateProps["selectedIds"]}>) {
            const {ids, groupId} = action.payload
            state.selectedIds[groupId] = ids
        },
    },
    extraReducers: (builder) => {
        // Загрузка учеников
        builder.addCase(fetchStudents.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            studentAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchStudents.rejected, (state) => {
            state.loading = false
        })

        // Создание ученика
        builder.addCase(createStudent.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createStudent.fulfilled, (state, action) => {
            if (action.payload?.id)
                studentAdapter.addOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(createStudent.rejected, (state) => {
            state.loading = false
        })

        // Обновление данных ученика
        builder.addCase(updateStudent.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            if (action.payload?.id)
                studentAdapter.updateOne(state, {id: action.payload.id, changes: action.payload})
            state.loading = false
        })
        builder.addCase(updateStudent.rejected, (state) => {
            state.loading = false
        })

        // Удаление ученика
        builder.addCase(deleteStudent.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            studentAdapter.removeOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(deleteStudent.rejected, (state) => {
            state.loading = false
        })

        // Отправка монет студенту
        builder.addCase(sendCoins.pending, (state) => {
            state.loading = true
        })
        builder.addCase(sendCoins.fulfilled, (state, action) => {
            action.payload.ids.map(id => {
                const _student = state.entities[id]
                if (_student) {
                    const coins = Number(_student.coins) + Number(action.payload.coin)
                    const update = {..._student, coins}
                    studentAdapter.updateOne(state, {id, changes: update})
                }
                return id
            })
            state.loading = false
        })
        builder.addCase(sendCoins.rejected, (state) => {
            state.loading = false
        })

        // Блокировка ученика
        builder.addCase(blockStudent.pending, (state) => {
            state.loading = true
        })
        builder.addCase(blockStudent.fulfilled, (state, action) => {
            studentAdapter.updateOne(state, {
                id: action.payload.studentId,
                changes: {
                    is_blocked: true,
                    day_block: action.payload.data.day_block
                }
            })
            state.loading = false
        })
        builder.addCase(blockStudent.rejected, (state) => {
            state.loading = false
        })

        // Разблокировка ученика
        builder.addCase(unblockStudent.pending, (state) => {
            state.loading = true
        })
        builder.addCase(unblockStudent.fulfilled, (state, action) => {
            studentAdapter.updateOne(state, {
                id: action.payload.studentId,
                changes: {
                    day_block: null,
                    is_blocked: false,
                    day_unblock: action.payload.data.day_unblock
                }
            })
            state.loading = false
        })
        builder.addCase(unblockStudent.rejected, (state) => {
            state.loading = false
        })
    }
})

// export const {
    // selectById: getStudentById
    // selectIds: selectStudentIds,
    // selectEntities: selectStudentEntities,
    // selectAll: selectAllStudents,
    // selectTotal: selectTotalStudents
// } =
    studentAdapter.getSelectors<TeacherState>(state => state.students)

export const {changeSelectedIds, resetStudentSlice} = studentsSlice.actions

export default studentsSlice.reducer
