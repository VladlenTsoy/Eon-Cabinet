import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {fetchHomeworkByCategoryId} from "./fetchHomeworkByCategoryId";
import {TeacherState} from "../store";
import {deleteHomework} from "./deleteHomework";
import {updateHomework} from "./updateHomework";
import {createHomework} from "./createHomework";
import {Homework} from "../../../../lib/types/teacher/Homework";
import {fetchSelectsHomework} from "./fetchSelectsHomework";

//
export const homeworkAdapter = createEntityAdapter<Homework>()

export interface StateProps {
    loading: boolean;
    categories: {
        [categoryId: number]: {
            loading?: boolean
            total?: number
            current_page?: number
            last_page?: number
        }
    }
    selects: {
        [categoryId: number]: {
            loading?: boolean
            force?: boolean
            data?: Homework[]
        }
    }
}

const initialState = homeworkAdapter.getInitialState<StateProps>({
    loading: true,
    categories: [],
    selects: [],
});

const homeworkSlice = createSlice({
    name: 'homework',
    initialState,
    reducers: {
        resetHomeworkSlice: () => initialState,
    },
    extraReducers: (builder) => {
        // Обновить домашнее задание
        builder.addCase(updateHomework.pending, (state, action) => {
            const {category_id} = action.meta.arg.data
            const categoryId = Number(category_id)
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: true}
        })
        builder.addCase(updateHomework.fulfilled, (state, action) => {
            const {category_id} = action.meta.arg.data
            const categoryId = Number(category_id)

            if (action.payload?.id)
                homeworkAdapter.updateOne(state, {id: action.payload.id, changes: action.payload})

            state.selects[categoryId] = {...state.selects[categoryId] || {}, force: true}
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })
        builder.addCase(updateHomework.rejected, (state, action) => {
            const {category_id} = action.meta.arg.data
            const categoryId = Number(category_id)
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })

        // Создать домашнее задание
        builder.addCase(createHomework.pending, (state, action) => {
            const {category_id} = action.meta.arg.data
            const categoryId = Number(category_id)
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: true}
        })
        builder.addCase(createHomework.fulfilled, (state, action) => {
            const {category_id} = action.meta.arg.data
            const categoryId = Number(category_id)

            if (action.payload?.id)
                homeworkAdapter.addOne(state, action.payload)

            state.selects[categoryId] = {...state.selects[categoryId] || {}, force: true}
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })
        builder.addCase(createHomework.rejected, (state, action) => {
            const {category_id} = action.meta.arg.data
            const categoryId = Number(category_id)
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })

        // Вывод домашнее задние по категории
        builder.addCase(fetchHomeworkByCategoryId.pending, (state, action) => {
            const {categoryId} = action.meta.arg
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: true}
        })
        builder.addCase(fetchHomeworkByCategoryId.fulfilled, (state, action) => {
            const {categoryId} = action.meta.arg
            const {total, last_page, current_page, results} = action.payload

            homeworkAdapter.upsertMany(state, results)
            state.categories[categoryId] = {total, current_page, last_page, loading: false}
        })
        builder.addCase(fetchHomeworkByCategoryId.rejected, (state, action) => {
            const {categoryId} = action.meta.arg
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })

        // Удалить домашнее задание
        builder.addCase(deleteHomework.pending, (state, action) => {
            const {categoryId} = action.meta.arg
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: true}
        })
        builder.addCase(deleteHomework.fulfilled, (state, action) => {
            const {categoryId, homeworkId} = action.meta.arg
            homeworkAdapter.removeOne(state, homeworkId)
            state.selects[categoryId] = {...state.selects[categoryId] || {}, force: true}
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })
        builder.addCase(deleteHomework.rejected, (state, action) => {
            const {categoryId} = action.meta.arg
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })

        // Загрузка дом. задания для формы
        builder.addCase(fetchSelectsHomework.pending, (state, action) => {
            const {categoryId} = action.meta.arg
            state.selects[categoryId] = {...state.selects[categoryId] || {}, loading: true}
        })
        builder.addCase(fetchSelectsHomework.fulfilled, (state, action) => {
            const {categoryId} = action.meta.arg
            state.selects[categoryId] = {...state.selects[categoryId] || {}, loading: false, data: action.payload}
        })
        builder.addCase(fetchSelectsHomework.rejected, (state, action) => {
            const {categoryId} = action.meta.arg
            state.selects[categoryId] = {...state.selects[categoryId] || {}, loading: false}
        })
    }
});

// Can create a set of memoized selectors based on the location of this entity state
export const {
    // selectById: getHomeworkById,
    // selectIds: selectHomeworkIds,
    // selectEntities: selectHomeworkEntities,
    selectAll: selectAllHomework,
    // selectTotal: selectTotalHomework
} = homeworkAdapter.getSelectors<TeacherState>(state => state.homework)

export const {resetHomeworkSlice} = homeworkSlice.actions;

export default homeworkSlice.reducer;
