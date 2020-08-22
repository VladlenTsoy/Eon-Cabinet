import {createSlice, PayloadAction, createEntityAdapter} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {Group} from "../../../../lib/types/teacher/Group";
import {fetchGroups} from "./fetchGroups";
import {createGroup} from "./createGroup";
import {updateGroup} from "./updateGroup";
import {deleteGroup} from "./deleteGroup";

//
export const groupAdapter = createEntityAdapter<Group>()

export interface StateProps {
    isSaved: boolean
    total: number
    loading: boolean
}

const initialState = groupAdapter.getInitialState<StateProps>({
    loading: true,
    total: 0,
    isSaved: false,
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
        builder.addCase(fetchGroups.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchGroups.fulfilled, (state, action) => {
            groupAdapter.upsertMany(state, action.payload.data)
            state.total = action.payload.total
            state.loading = false
        })
        builder.addCase(fetchGroups.rejected, (state) => {
            state.loading = false
        })

        // Создания группы
        builder.addCase(createGroup.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createGroup.fulfilled, (state, action) => {
            if (action.payload?.id)
                groupAdapter.addOne(state, action.payload)
            state.loading = false;
        })
        builder.addCase(createGroup.rejected, (state) => {
            state.loading = false;
        })

        // Редактированние группы
        builder.addCase(updateGroup.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateGroup.fulfilled, (state, action) => {
            if (action.payload?.id)
                groupAdapter.updateOne(state, {id: action.payload.id, changes: action.payload})
            state.loading = false;
        })
        builder.addCase(updateGroup.rejected, (state) => {
            state.loading = false;
        })

        // Удаление группы
        builder.addCase(deleteGroup.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteGroup.fulfilled, (state, action) => {
            groupAdapter.removeOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(deleteGroup.rejected, (state) => {
            state.loading = false;
        })
    }
});

export const groupSelector = (state: TeacherState) => state.group;

// Can create a set of memoized selectors based on the location of this entity state
export const {
    selectById: getGroupById,
    selectIds: selectGroupIds,
    selectEntities: selectGroupEntities,
    selectAll: selectAllGroups,
    selectTotal: selectTotalGroups
} = groupAdapter.getSelectors<TeacherState>(state => state.group)

export const {changeIsSaved, resetGroupSlice} = groupSlice.actions;

export default groupSlice.reducer;