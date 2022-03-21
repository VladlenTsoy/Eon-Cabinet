import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Message} from "../../interfaces/Message"
import {CommonState} from "store/store"
import {fetchMessagesByChatId} from "./fetchMessagesByChatId"
import {addMessage} from "./addMessage"
import moment from "moment"
import {fetchMessages} from "./fetchMessages"

export const messageAdapter = createEntityAdapter<Message>({
    selectId: message => message.id,
    sortComparer: (a, b) => moment(a.created_at).isAfter(b.created_at) ? 1 : 0
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
    reducers: {
        addSocketMessages: (state, action: PayloadAction<Message[]>) => {
            messageAdapter.upsertMany(state, action.payload)
        },
        updateMessages: (state, action: PayloadAction<Message[]>) => {
            const messages: Message[] = action.payload.map(message => ({...message, status: "view"}))
            messageAdapter.upsertMany(state, messages)
        }
    },
    extraReducers: builder => {
        // Вывод сообщений в чате
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

        // Вывод всех непрочитанных сообщений
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            messageAdapter.upsertMany(state, action.payload)
        })

        // Добавление сообщения
        builder.addCase(addMessage.pending, (state, action) => {
            const {chatId, userId, message} = action.meta.arg
            const createdAt = (new Date()).toUTCString()

            const data: Message = {
                id: 9999,
                message,
                user_id: userId,
                chat_id: chatId,
                status: "loading",
                created_at: createdAt
            }

            messageAdapter.addOne(state, data)
        })
        builder.addCase(addMessage.fulfilled, (state, action) => {
            const data = action.payload
            messageAdapter.updateOne(state, {
                id: 9999,
                changes: data
            })
        })
        builder.addCase(addMessage.rejected, (state) => {
            messageAdapter.updateOne(state, {
                id: 9999,
                changes: {
                    status: "error"
                }
            })
        })
    }
})

export const {
    // selectById: getMessagesById,
    // selectIds: selectMessagesIds,
    // selectEntities: selectMessagesEntities,
    selectAll: selectAllMessages
    // selectTotal: selectTotalMessages
} = messageAdapter.getSelectors<CommonState>(state => state.messages)

export const {addSocketMessages, updateMessages} = messagesSlice.actions

export default messagesSlice.reducer
