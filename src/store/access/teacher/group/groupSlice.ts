import {createSlice, PayloadAction, createEntityAdapter} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {Group} from "../../../../lib/types/teacher/Group";
import {fetchGroups} from "./fetchGroups";
import {createGroup} from "./createGroup";
import {updateGroup} from "./updateGroup";
import {deleteGroup} from "./deleteGroup";
import {fetchGroup} from "./fetchGroup";
import {fetchStatisticsGroups} from "./fetchStatisticsGroups";
import {fetchSelectsGroups} from "./fetchSelectsGroups";

//
export const groupAdapter = createEntityAdapter<Group>({
    sortComparer: (a, b) => a.id > b.id ? 1 : 0
})

export interface StateProps {
    isSaved: boolean
    statistics: {
        loading: boolean
        count: number
    }
    selects: {
        [categoryId: number]: {
            loading?: boolean
            force?: boolean
            data?: {
                id: Group['id'],
                title: Group['title']
            }[]
        }
    }
    loading: boolean
    page_size: number
    categories: {
        [categoryId: number]: {
            loading?: boolean
            total?: number
            current_page?: number
            last_page?: number
        }
    }
}

const initialState = groupAdapter.getInitialState<StateProps>({
    isSaved: false,
    selects: [],
    statistics: {
        loading: false,
        count: 0
    },
    loading: false,
    page_size: 15,
    categories: []
});

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        resetGroupSlice: () => initialState,
        changeIsSaved(state, action: PayloadAction<boolean>) {
            state.isSaved = action.payload
        },
    },
    extraReducers: (builder) => {
        // Загрузка групп
        builder.addCase(fetchGroups.pending, (state, action) => {
            const {categoryId} = action.meta.arg
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: true}
        })
        builder.addCase(fetchGroups.fulfilled, (state, action) => {
            const {categoryId} = action.meta.arg
            const {total, last_page, current_page, results} = action.payload

            groupAdapter.upsertMany(state, results)
            state.categories[categoryId] = {total, current_page, last_page, loading: false}
        })
        builder.addCase(fetchGroups.rejected, (state, action) => {
            const {categoryId} = action.meta.arg
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })

        // Загрузка группы
        builder.addCase(fetchGroup.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchGroup.fulfilled, (state, action) => {
            groupAdapter.upsertMany(state, action.payload.data)
            // state.total = action.payload.total
            state.loading = false
        })
        builder.addCase(fetchGroup.rejected, (state) => {
            state.loading = false
        })

        // Создания группы
        builder.addCase(createGroup.pending, (state, action) => {
            const categoryId = Number(action.meta.arg.category_id)
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: true}
        })
        builder.addCase(createGroup.fulfilled, (state, action) => {
            const categoryId = Number(action.meta.arg.category_id)
            if (action.payload?.id)
                groupAdapter.addOne(state, action.payload)
            state.statistics.count++
            state.selects[categoryId] = {...state.selects[categoryId] || {}, force: true}
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })
        builder.addCase(createGroup.rejected, (state, action) => {
            const categoryId = Number(action.meta.arg.category_id)
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })

        // Редактированние группы
        builder.addCase(updateGroup.pending, (state, action) => {
            const categoryId = Number(action.meta.arg.data.category_id)
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: true}
        })
        builder.addCase(updateGroup.fulfilled, (state, action) => {
            const categoryId = Number(action.meta.arg.data.category_id)
            if (action.payload?.id)
                groupAdapter.updateOne(state, {id: action.payload.id, changes: action.payload})
            state.selects[categoryId] = {...state.selects[categoryId] || {}, force: true}
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })
        builder.addCase(updateGroup.rejected, (state, action) => {
            const categoryId = Number(action.meta.arg.data.category_id)
            state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })

        // Удаление группы
        builder.addCase(deleteGroup.pending, (state, action) => {
            const id = Number(action)
            const categoryId = Object.values(state.entities).find(group => group && group.id === id)?.category.id
            if (categoryId)
                state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: true}
        })
        builder.addCase(deleteGroup.fulfilled, (state, action) => {
            groupAdapter.removeOne(state, action.payload)

            const id = Number(action)
            const categoryId = Object.values(state.entities).find(group => group && group.id === id)?.category.id
            state.statistics.count--
            if (categoryId) {
                state.selects[categoryId] = {...state.selects[categoryId] || {}, force: true}
                state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
            }
        })
        builder.addCase(deleteGroup.rejected, (state, action) => {
            const id = Number(action)
            const categoryId = Object.values(state.entities).find(group => group && group.id === id)?.category.id
            if (categoryId)
                state.categories[categoryId] = {...state.categories[categoryId] || {}, loading: false}
        })

        // Загрузка статистики
        builder.addCase(fetchStatisticsGroups.pending, state => {
            state.statistics.loading = true
        })
        builder.addCase(fetchStatisticsGroups.fulfilled, (state, action) => {
            state.statistics.count = action.payload
            state.statistics.loading = false
        })
        builder.addCase(fetchStatisticsGroups.rejected, state => {
            state.statistics.loading = false
        })

        // Загрузка групп для формы
        builder.addCase(fetchSelectsGroups.pending, (state, action) => {
            const {categoryId} = action.meta.arg
            state.selects[categoryId] = {...state.selects[categoryId] || {}, loading: true}
        })
        builder.addCase(fetchSelectsGroups.fulfilled, (state, action) => {
            const {categoryId} = action.meta.arg
            state.selects[categoryId] = {...state.selects[categoryId] || {}, loading: false, data: action.payload}
        })
        builder.addCase(fetchSelectsGroups.rejected, (state, action) => {
            const {categoryId} = action.meta.arg
            state.selects[categoryId] = {...state.selects[categoryId] || {}, loading: false}
        })
    }
});

export const groupSelector = (state: TeacherState) => state.group;

// Can create a set of memoized selectors based on the location of this entity state
export const {
    selectById: getGroupById,
    // selectIds: selectGroupIds,
    // selectEntities: selectGroupEntities,
    selectAll: selectAllGroups,
    // selectTotal: selectTotalGroups
} = groupAdapter.getSelectors<TeacherState>(state => state.group)

export const {changeIsSaved, resetGroupSlice} = groupSlice.actions;

export default groupSlice.reducer;