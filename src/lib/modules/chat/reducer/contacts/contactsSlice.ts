import {createSlice, createEntityAdapter} from '@reduxjs/toolkit'
import {Contact} from "../../interfaces/Contact"
import {fetchContacts} from "./fetchContacts"
import {CommonState} from "../../../../../store/common/store"

//
export const contactsAdapter = createEntityAdapter<Contact>()

export interface StateProps {
    loading: boolean
}

const initialState = contactsAdapter.getInitialState<StateProps>({
    loading: false
})

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchContacts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            contactsAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchContacts.rejected, state => {
            state.loading = false
        })
    }
})

export const {
    selectById: getContactsById,
    // selectIds: selectContactsIds,
    selectEntities: selectContactsEntities,
    selectAll: selectAllContacts,
    selectTotal: selectTotalContacts
} = contactsAdapter.getSelectors<CommonState>(state => state.contacts)

export default contactsSlice.reducer;