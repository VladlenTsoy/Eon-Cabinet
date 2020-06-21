import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchHomeworkByCategoryId} from "./fetchHomeworkByCategoryId";
import {TeacherState} from "../store";

interface HomeworkProps {
    id: number;
    level: number;
    description: string;
    discipline_id: number;
    category_id: number;
}

interface StateProps {
    fetchLoading: boolean;
    categories: any[];
}

const initialState: StateProps = {
    fetchLoading: false,
    categories: [],
};

const homeworkSlice = createSlice({
    name: 'homework',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchHomeworkByCategoryId.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchHomeworkByCategoryId.fulfilled]: (state, action: PayloadAction<{ categoryId: number, homework: HomeworkProps[] }>) => {
            state.categories[action.payload.categoryId] = action.payload.homework || [];
            state.fetchLoading = false;
        },
    }
});


export const homeworkSelector = (state: TeacherState) => state.homework;

export const {} = homeworkSlice.actions;

export default homeworkSlice.reducer;
