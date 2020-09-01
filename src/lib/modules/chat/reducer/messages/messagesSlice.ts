import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Message} from "../../interfaces/Message"
import {fetchMessages} from "./fetchMessages"
import {CommonState} from "../../../../../store/common/store"

export const messagesAdapter = createEntityAdapter<Message>()

export interface StateProps {
    loading: boolean
}

const initialState = messagesAdapter.getInitialState<StateProps>({
    loading: false
})

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchMessages.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            messagesAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchMessages.rejected, state => {
            state.loading = false
        })
    }
})

export const {
    selectById: getMessagesById,
    // selectIds: selectMessagesIds,
    selectEntities: selectMessagesEntities,
    selectAll: selectAllMessages,
    selectTotal: selectTotalMessages
} = messagesAdapter.getSelectors<CommonState>(state => state.messages)

export default messagesSlice.reducer;