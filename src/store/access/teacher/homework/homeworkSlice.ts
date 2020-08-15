import {createSlice} from "@reduxjs/toolkit";
import {fetchHomeworkByCategoryId} from "./fetchHomeworkByCategoryId";
import {TeacherState} from "../store";
import {deleteHomework} from "./deleteHomework";
import {updateHomework} from "./updateHomework";
import {createHomework} from "./createHomework";
import {tasksExtraReducers, tasksState, TasksState} from "./tasks/tasks";

export interface TaskHomeworkProps {

}

export interface HomeworkProps {
    id: number;
    level: number;
    description: string;
    discipline_id: number;
    category_id: number;
    created_at: string;
    tasks?: TaskHomeworkProps[]
}

export interface StateProps {
    fetchLoading: boolean;
    categories: { [categoryId: number]: HomeworkProps[] };
    tasks: TasksState
}

const initialState: StateProps = {
    fetchLoading: true,
    categories: [],
    tasks: tasksState
};

const homeworkSlice = createSlice({
    name: 'homework',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateHomework.pending, (state) => {
            state.fetchLoading = true
        })
        builder.addCase(updateHomework.fulfilled, (state, action) => {
            if (action.payload?.id)
                state.categories[action.payload.category_id] = state.categories[action.payload.category_id]
                    .map((homework) => homework.id === action.payload.id ? action.payload : homework);
            state.fetchLoading = false;
        })

        builder.addCase(createHomework.pending, (state) => {
            state.fetchLoading = true;
        })
        builder.addCase(createHomework.fulfilled, (state, action) => {
            if (action.payload?.id)
                state.categories[action.payload.category_id] = [action.payload, ...state.categories[action.payload.category_id]];
            state.fetchLoading = false;
        })

        builder.addCase(fetchHomeworkByCategoryId.pending, (state) => {
            state.fetchLoading = true;
        })
        builder.addCase(fetchHomeworkByCategoryId.fulfilled, (state, action) => {
            state.categories[action.payload.categoryId] = action.payload.homework || [];
            state.fetchLoading = false;
        })

        builder.addCase(deleteHomework.pending, (state) => {
            state.fetchLoading = true;
        })
        builder.addCase(deleteHomework.fulfilled, (state, action) => {
            state.categories[action.payload.categoryId] = state.categories[action.payload.categoryId]
                .filter((homework) => homework.id !== action.payload.homeworkId);
            state.fetchLoading = false;
        })

        tasksExtraReducers(builder)
    }
});

export const homeworkSelector = (state: TeacherState) => state.homework;

export default homeworkSlice.reducer;
