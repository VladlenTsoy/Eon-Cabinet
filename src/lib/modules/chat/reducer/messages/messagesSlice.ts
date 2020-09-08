import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Message} from "../../interfaces/Message"
import {CommonState} from "../../../../../store/common/store"
import {fetchMessagesByChatId} from "./fetchMessagesByChatId"
import {addMessage} from "./addMessage"

//
export const messageAdapter = createEntityAdapter<Message>({
    selectId: message => message.id
})

export interface StateProps {
    chats: {
        [chatId: number]: {
            loading?: boolean
            total?: number
            current_page?: number
            last_page?: number
        }
    }
}

const initialState = messageAdapter.getInitialState<StateProps>({
    chats: []
})

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: builder => {
        //
        builder.addCase(fetchMessagesByChatId.pending, (state, action) => {
            const {chatId} = action.meta.arg
            state.chats[chatId] = {...state.chats[chatId] || {}, loading: true}
        })
        builder.addCase(fetchMessagesByChatId.fulfilled, (state, action) => {
            const {chatId} = action.meta.arg
            const {total, last_page, current_page, results} = action.payload

            messageAdapter.upsertMany(state, results)
            state.chats[chatId] = {total, current_page, last_page, loading: false}
        })
        builder.addCase(fetchMessagesByChatId.rejected, (state, action) => {
            const {chatId} = action.meta.arg
            state.chats[chatId] = {...state.chats[chatId] || {}, loading: false}
        })
        //
        // builder.addCase(addMessage.pending, (state, action) => {
            // messageAdapter.addOne(state, {id: , changes})
        // })
        builder.addCase(addMessage.fulfilled, (state, action) => {
            const data = action.payload
            messageAdapter.addOne(state, data)
        })
        // builder.addCase(addMessage.rejected, (state, action) => {
            // messageAdapter.addOne(state, action.payload)
        // })
    }
})

export const {
    // selectById: getMessagesById,
    // selectIds: selectMessagesIds,
    // selectEntities: selectMessagesEntities,
    selectAll: selectAllMessages
    // selectTotal: selectTotalMessages
} = messageAdapter.getSelectors<CommonState>(state => state.messages)

export const {} = messagesSlice.actions

export default messagesSlice.reducer