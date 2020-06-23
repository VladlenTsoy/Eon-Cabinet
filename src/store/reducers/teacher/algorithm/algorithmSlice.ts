import {createSlice} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchAlgorithms} from "./fetchAlgorithms";

interface StateProps {
    algorithms: any;
    fetchLoading: boolean;
}

const initialState: StateProps = {
    algorithms: null,
    fetchLoading: true,
};

const algorithmSlice = createSlice({
    name: 'algorithm',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchAlgorithms.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchAlgorithms.fulfilled]: (state, action) => {
            state.algorithms = action.payload;
            state.fetchLoading = false;
        }
    }
});

export const algorithmSelector = (state: TeacherState) => state.algorithm;

export default algorithmSlice.reducer;
