import {createSlice} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchCategories} from "./fetchCategories";
import {Category} from "../../../../lib/types/common/Category";

interface StateProps {
    categories: Category[];
    fetchLoading: boolean;
}

const initialState: StateProps = {
    categories: [],
    fetchLoading: true,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, state => {
            state.fetchLoading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            // Add user to the state array
            state.categories = action.payload;
            state.fetchLoading = false;
        })
    }
});

export const categorySelector = (state: TeacherState) => state.category;

export default categorySlice.reducer;
