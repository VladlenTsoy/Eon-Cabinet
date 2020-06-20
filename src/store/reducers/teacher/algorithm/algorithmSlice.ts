import {createSlice} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchAlgorithms} from "./fetchAlgorithms";

interface StateProps {
    algorithms: object[]
}

const initialState: StateProps = {
    algorithms: []
};

const algorithmSlice = createSlice({
    name: 'algorithm',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchAlgorithms.fulfilled]: (state, action) => {
            state.algorithms = action.payload;
        }
    }
});

export const algorithmSelector = (state: TeacherState) => state.algorithm;

export const {} = algorithmSlice.actions;

export default algorithmSlice.reducer;
