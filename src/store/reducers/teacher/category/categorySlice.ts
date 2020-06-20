import {createSlice} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchCategories} from "./fetchCategories";

interface StateProps {
    categories: object[]
}

const initialState: StateProps = {
    categories: []
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchCategories.fulfilled]: (state, action) => {
            // Add user to the state array
            state.categories = action.payload;
        }
    }
});

export const categorySelector = (state: TeacherState) => state.category;

export const {} = categorySlice.actions;

export default categorySlice.reducer;
