import {Chat} from "../../interfaces/Chat"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../../../../../store/common/store"
import {apiRequest} from "../../../../../utils/api"
import {Message} from "../../interfaces/Message"

type ReturnedType = {
    total: number
    results: Message[]
    last_page: number
    current_page: number
    per_page: number
}

interface ArgsProps {
    chatId: Chat["chat_id"],
    page?: number
}

export const fetchMessagesByChatId = createAsyncThunk<ReturnedType, ArgsProps, CommonThunkProps>(
    "messages/fetch",
    async ({chatId, page = 1}, {signal}) => {
        return await apiRequest("get", `messages/${chatId}`, {signal, api2: true, params: {page}})
    },
    {
        condition({chatId, page = 1}, {getState}) {
            const {messages} = getState();
            if(!messages.chats[chatId]) return true
            const {current_page = 0, last_page = 0} = messages.chats[chatId]
            if (!current_page) return true
            if (current_page >= page || current_page >= last_page) return false
        }
    }
)