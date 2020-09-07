import {createSlice, createEntityAdapter, PayloadAction} from "@reduxjs/toolkit"
import {Contact} from "../../interfaces/Contact"
import {fetchContacts} from "./fetchContacts"
import {CommonState} from "../../../../../store/common/store"

//
export const contactsAdapter = createEntityAdapter<Contact>()

export interface StateProps {
    loading: boolean
    selectedContactId: Contact["id"] | null
}

const initialState = contactsAdapter.getInitialState<StateProps>({
    loading: false,
    selectedContactId: null
})

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        changeSelectedContactId: (state, action: PayloadAction<Contact["id"] | null>) => {
            state.selectedContactId = action.payload
        }
    },
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
    // selectEntities: selectContactsEntities,
    selectAll: selectAllContacts
    // selectTotal: selectTotalContacts
} = contactsAdapter.getSelectors<CommonState>(state => state.contacts)

export const {changeSelectedContactId} = contactsSlice.actions

export default contactsSlice.reducer