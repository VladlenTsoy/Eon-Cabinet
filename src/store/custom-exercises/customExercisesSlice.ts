import {createSlice} from "@reduxjs/toolkit";
import {StoreState} from "store";
import {fetchCustomExercises} from "./fetchCustomExercises";
import {createCustomExercises} from "./createCustomExercises";
import {editCustomExercises} from "./editCustomExercises";

export interface StateProps {
    loading: boolean
    exercises: any[]
}

const initialState: StateProps = {
    loading: true,
    exercises: []
}

const customExercisesSlice = createSlice({
    name: 'customExercises',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCustomExercises.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCustomExercises.fulfilled, (state, action) => {
            state.exercises = action.payload;
            state.loading = false;
        })

        builder.addCase(createCustomExercises.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createCustomExercises.fulfilled, (state, action) => {
            state.exercises = [...state.exercises, action.payload];
            state.loading = false;
        })

        builder.addCase(editCustomExercises.pending, (state) => {
            state.loading = true
        })
        builder.addCase(editCustomExercises.fulfilled, (state, action) => {
            // state.exercises = [...state.exercises, action.payload];
            state.loading = false;
        })
    }
})

export const customExercisesSelector = (state: StoreState) => state.customExercises;

export default customExercisesSlice.reducer;
