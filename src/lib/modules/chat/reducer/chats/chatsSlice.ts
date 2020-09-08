import {createSlice, createEntityAdapter, PayloadAction} from "@reduxjs/toolkit"
import {Chat} from "../../interfaces/Chat"
import {fetchChats} from "./fetchChats"
import {CommonState} from "../../../../../store/common/store"

//
export const chatsAdapter = createEntityAdapter<Chat>({
    selectId: chat => chat.chat_id
})

export interface StateProps {
    loading: boolean
    selectedChatId: Chat["chat_id"] | null
}

const initialState = chatsAdapter.getInitialState<StateProps>({
    loading: false,
    selectedChatId: null
})

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        changeSelectedChatId: (state, action: PayloadAction<Chat["chat_id"] | null>) => {
            state.selectedChatId = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchChats.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchChats.fulfilled, (state, action) => {
            chatsAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchChats.rejected, state => {
            state.loading = false
        })
    }
})

export const {
    selectById: getChatsById,
    // selectIds: selectChatsIds,
    // selectEntities: selectChatsEntities,
    selectAll: selectAllChats
    // selectTotal: selectTotalChats
} = chatsAdapter.getSelectors<CommonState>(state => state.chats)

export const {changeSelectedChatId} = chatsSlice.actions

export default chatsSlice.reducer