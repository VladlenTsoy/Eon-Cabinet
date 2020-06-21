import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchCategories} from "./fetchCategories";

interface CategoryProps {
    id: number;
    title: string;
    active: boolean;
}

interface StateProps {
    categories: CategoryProps[];
    fetchLoading: boolean;
}

const initialState: StateProps = {
    categories: [],
    fetchLoading: false,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchCategories.fulfilled]: (state, action: PayloadAction<CategoryProps[]>) => {
            // Add user to the state array
            state.categories = action.payload;
            state.fetchLoading = false;
        }
    }
});

export const categorySelector = (state: TeacherState) => state.category;

export const {} = categorySlice.actions;

export default categorySlice.reducer;
