import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {StoreState} from "store";
import {fetchCategories} from "./fetchCategories";
import {Category} from "../../lib/types/common/Category";
import {getCookie, setCookie} from "../../utils/cookie";

export const categoryAdapter = createEntityAdapter<Category>()

interface StateProps {
    loading: boolean
    activeCategoryId: Category['id'] | null
}

const initialState = categoryAdapter.getInitialState<StateProps>({
    loading: true,
    activeCategoryId: getCookie('active_category_id') ? Number(getCookie('active_category_id')) : null
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetCategorySlice: () => initialState,
        changeActiveCategoryId: (state, action: PayloadAction<Category['id']>) => {
            state.activeCategoryId = action.payload
            setCookie('active_category_id', String(action.payload))
        }
    },
    extraReducers: (builder) => {
        // Загрука категорий
        builder.addCase(fetchCategories.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            // Add user to the state array
            categoryAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchCategories.rejected, state => {
            state.loading = false
        })
    }
});

export const categorySelector = (state: StoreState) => state.category;

// Can create a set of memoized selectors based on the location of this entity state
export const {
    // selectById: getCategoryById,
    selectIds: selectCategoryIds,
    selectEntities: selectCategoryEntities,
    selectAll: selectAllCategories,
    selectTotal: selectTotalCategories
} = categoryAdapter.getSelectors<StoreState>(state => state.category)

export const {changeActiveCategoryId, resetCategorySlice} = categorySlice.actions;

export default categorySlice.reducer;
