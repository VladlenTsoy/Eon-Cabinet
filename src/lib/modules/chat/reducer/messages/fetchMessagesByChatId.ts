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
        // condition(_, {getState}) {
        //     const {chats} = getState();
        //     return !chats.ids.length
        // }
    }
)