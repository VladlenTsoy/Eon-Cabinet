import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../store";
import {statisticExtraReducers, statisticState, StatisticState} from "./statistic/statistic";
import {recentHomeworkExtraReducers, RecentHomeworkState, recentHomeworkState} from "./recent-homework/recentHomework";
import {homeworkExtraReducer, homeworkReducer, homeworkState, HomeworkState} from "./homework/homework";
import {selectedExtraReducers, selectedReducers, selectedState, SelectedState} from "./selected/selected";
import {Student} from "../../../../lib/types/teacher/Student";
import {fetchStudentsDetails} from "./details/fetchStudentsDetails";
import {Group} from "../../../../lib/types/teacher/Group";
import {createStudent} from "./details/createStudent";
import {updateStudent} from "./details/updateStudent";
import {deleteStudent} from "./details/deleteStudent";
import {deleteStudents} from "./details/deleteStudents";
import {sendCoins} from "./details/sendСoins";
import {blockStudent} from "./details/blockStudent";
import {unblockStudent} from "./details/unblockStudent";

//
export const studentAdapter = createEntityAdapter<Student>()

//
export interface StateProps {
    loading: boolean
    // selectedIds: { [groupId: number]: Student['id'][] }
    selectedIds: any

    homework: HomeworkState
    recentHomework: RecentHomeworkState
    statistic: StatisticState
    selected: SelectedState
}

const initialState = studentAdapter.getInitialState<StateProps>({
    loading: true,
    selectedIds: [],

    homework: homeworkState,
    recentHomework: recentHomeworkState,
    statistic: statisticState,
    selected: selectedState,
});

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        resetStudentSlice: () => initialState,
        changeSelectedIds(state: StateProps, action: PayloadAction<{ groupId: Group['id'], ids: StateProps['selectedIds'] }>) {
            const {ids, groupId} = action.payload
            state.selectedIds[groupId] = ids;
        },
        ...selectedReducers,
        ...homeworkReducer
    },
    extraReducers: (builder) => {
        // Загрузка учеников
        builder.addCase(fetchStudentsDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchStudentsDetails.fulfilled, (state, action) => {
            studentAdapter.upsertMany(state, action.payload)
            state.loading = false;
        })
        builder.addCase(fetchStudentsDetails.rejected, (state) => {
            state.loading = false;
        })

        // Создание ученика
        builder.addCase(createStudent.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createStudent.fulfilled, (state, action) => {
            if (action.payload?.id)
                studentAdapter.addOne(state, action.payload)
            state.loading = false;
        })
        builder.addCase(createStudent.rejected, (state) => {
            state.loading = false;
        })

        // Обновление данных ученика
        builder.addCase(updateStudent.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            if (action.payload?.id)
                studentAdapter.updateOne(state, {id: action.payload.id, changes: action.payload})
            state.loading = false;
        })
        builder.addCase(updateStudent.rejected, (state) => {
            state.loading = false;
        })

        // Удаление ученика
        builder.addCase(deleteStudent.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            studentAdapter.removeOne(state, action.payload)
            state.loading = false;
        })
        builder.addCase(deleteStudent.rejected, (state) => {
            state.loading = false;
        })

        // Удаление учеников
        builder.addCase(deleteStudents.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteStudents.fulfilled, (state, action) => {
            studentAdapter.removeMany(state, action.payload)
            state.loading = false;
        })
        builder.addCase(deleteStudents.rejected, (state) => {
            state.loading = false;
        })

        // Отправка монет студенту
        builder.addCase(sendCoins.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(sendCoins.fulfilled, (state) => {
            // state.details.data.map((student) => {
            //     if (action.payload.ids.includes(student.id))
            //         student.coins += action.payload.coin
            //     return student
            // })
            // studentAdapter.updateMany(state, )
            // action.payload.ids.map((id) => studentAdapter.updateOne(state, {id, changes: (student) => student}))
            state.loading = false;
        })
        builder.addCase(sendCoins.rejected, (state) => {
            state.loading = false;
        })

        // Блокировка ученика
        builder.addCase(blockStudent.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(blockStudent.fulfilled, (state, action) => {
            studentAdapter.updateOne(state, {
                id: action.payload.studentId,
                changes: {
                    is_blocked: true,
                    day_block: action.payload.data.day_block
                }
            })
            state.loading = false;
        })
        builder.addCase(blockStudent.rejected, (state) => {
            state.loading = false;
        })

        // Разблокировка ученика
        builder.addCase(unblockStudent.pending, (state) => {
            state.loading = true;
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
            state.loading = false;
        })
        builder.addCase(unblockStudent.rejected, (state) => {
            state.loading = false;
        })

        homeworkExtraReducer(builder)
        recentHomeworkExtraReducers(builder)
        statisticExtraReducers(builder)
        selectedExtraReducers(builder)
    }
})

export const studentsSelector = (state: TeacherState) => state.students;

// Can create a set of memoized selectors based on the location of this entity state
export const {
    selectById: getStudentById,
    selectIds: selectStudentIds,
    selectEntities: selectStudentEntities,
    selectAll: selectAllStudents,
    selectTotal: selectTotalStudents
} = studentAdapter.getSelectors<TeacherState>(state => state.students)

export const {changeSelectedIds, nextWeek, prevWeek, resetStudentSlice} = studentsSlice.actions;

export default studentsSlice.reducer;
