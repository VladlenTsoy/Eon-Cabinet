import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {StudentSentHomeworkTask} from "../../../../lib/types/teacher/StudentHomework"
import {fetchStudentsHomeworkTasks} from "./fetchStudentHomeworkTasks"
import {TeacherState} from "../store"

export const studentHomeworkTasksAdapter = createEntityAdapter<StudentSentHomeworkTask>()

export interface StateProps {
    loading: boolean
}

const initialState = studentHomeworkTasksAdapter.getInitialState<StateProps>({
    loading: true
})

const studentHomeworkTasksSlice = createSlice({
    name: "studentHomeworkTasks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchStudentsHomeworkTasks.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStudentsHomeworkTasks.fulfilled, (state, action) => {
            studentHomeworkTasksAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchStudentsHomeworkTasks.rejected, state => {
            state.loading = false
        })
    }
})

// export const {
//     // selectById: getStudentHomeworkTasksById,
//     // selectIds: selectStudentIds,
//     // selectEntities: selectStudentEntities,
//     // selectAll: selectAllStudentHomeworkTasks,
//     // selectTotal: selectTotalStudents
// } =
studentHomeworkTasksAdapter.getSelectors<TeacherState>(state => state.studentHomeworkTasks)

export default studentHomeworkTasksSlice.reducer