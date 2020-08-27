import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Exercise} from "../../../../lib/types/teacher/Homework";
import {fetchExercisesByHomeworkId} from "./fetchExercisesByHomeworkId";
import {TeacherState} from "../store";

export const homeworkExercisesAdapter = createEntityAdapter<Exercise>()

export interface StateProps {
    loading: boolean
}

const initialState = homeworkExercisesAdapter.getInitialState<StateProps>({
    loading: false,
})

const homeworkExercisesSlice = createSlice({
    name: 'homeworkExercises',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchExercisesByHomeworkId.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchExercisesByHomeworkId.fulfilled, (state, action) => {
            homeworkExercisesAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchExercisesByHomeworkId.rejected, (state) => {
            state.loading = true
        })
    })
})

// Can create a set of memoized selectors based on the location of this entity state
export const {
    // selectById: getHomeworkExercisesById,
    selectIds: selectHomeworkExercisesIds,
    selectEntities: selectHomeworkExercisesEntities,
    selectAll: selectAllHomeworkExercises,
    selectTotal: selectTotalHomeworkExercises
} = homeworkExercisesAdapter.getSelectors<TeacherState>(state => state.homeworkExercises)

export default homeworkExercisesSlice.reducer;