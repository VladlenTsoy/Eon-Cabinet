import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Contact} from "../../interfaces/Contact"
import {CommonState} from "../../../../../store/common/store"
import {fetchContactsBySearch} from "./fetchContactsBySearch"

export const contactsAdapter = createEntityAdapter<Contact>({
    selectId: contact => contact.id
})

export interface StateProps {
    loading: boolean
}

const initialState = contactsAdapter.getInitialState<StateProps>({
    loading: false,
})

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchContactsBySearch.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchContactsBySearch.fulfilled, (state, action) => {
            contactsAdapter.setAll(state, action)
            state.loading = false
        })
        builder.addCase(fetchContactsBySearch.rejected, state => {
            state.loading = false
        })
    }
})

export const {
    selectById: getContactById,
    selectAll: selectAllContacts
} = contactsAdapter.getSelectors<CommonState>(state => state.contacts)

export const {} = contactsSlice.actions

export default contactsSlice.reducer