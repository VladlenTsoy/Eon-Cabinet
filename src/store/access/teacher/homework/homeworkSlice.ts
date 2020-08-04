import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchHomeworkByCategoryId} from "./fetchHomeworkByCategoryId";
import {TeacherState} from "../store";
import {deleteHomework} from "./deleteHomework";
import {updateHomework} from "./updateHomework";
import {createHomework} from "./createHomework";

export interface HomeworkProps {
    id: number;
    level: number;
    description: string;
    discipline_id: number;
    category_id: number;
    created_at: string;
}

interface StateProps {
    fetchLoading: boolean;
    categories: { [categoryId: number]: HomeworkProps[] };
}

const initialState: StateProps = {
    fetchLoading: true,
    categories: [],
};

const homeworkSlice = createSlice({
    name: 'homework',
    initialState,
    reducers: {},
    extraReducers: {
        [updateHomework.pending]: (state) => {
            state.fetchLoading = true;
        },
        [updateHomework.fulfilled]: (state: StateProps, action: PayloadAction<HomeworkProps>) => {
            if (action.payload?.id)
                state.categories[action.payload.category_id] = state.categories[action.payload.category_id]
                    .map((homework) => homework.id === action.payload.id ? action.payload : homework);
            state.fetchLoading = false;
        },
        [createHomework.pending]: (state) => {
            state.fetchLoading = true;
        },
        [createHomework.fulfilled]: (state: StateProps, action: PayloadAction<HomeworkProps>) => {
            if (action.payload?.id)
                state.categories[action.payload.category_id] = [action.payload, ...state.categories[action.payload.category_id]];
            state.fetchLoading = false;
        },
        [fetchHomeworkByCategoryId.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchHomeworkByCategoryId.fulfilled]: (state, action: PayloadAction<{ categoryId: HomeworkProps['category_id'], homework: HomeworkProps[] }>) => {
            state.categories[action.payload.categoryId] = action.payload.homework || [];
            state.fetchLoading = false;
        },
        [deleteHomework.pending]: (state) => {
            state.fetchLoading = true;
        },
        [deleteHomework.fulfilled]: (state: StateProps, action: PayloadAction<{ categoryId: HomeworkProps['category_id'], homeworkId: HomeworkProps['id'] }>) => {
            state.categories[action.payload.categoryId] = state.categories[action.payload.categoryId]
                .filter((homework) => homework.id !== action.payload.homeworkId);
            state.fetchLoading = false;
        }
    }
});

export const homeworkSelector = (state: TeacherState) => state.homework;

export default homeworkSlice.reducer;
