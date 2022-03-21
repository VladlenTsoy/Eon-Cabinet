import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store/store"
import {apiRequest} from "../../../../../utils/api"
import {Message} from "../../interfaces/Message"
import {Chat} from "../../interfaces/Chat"
import {User} from "../../../../types/common/User"

type ReturnedType = Message

interface ArgsProps {
    chatId: Chat["chat_id"],
    userId: User["id"],
    message: string
}

/**
 * Добавить сообщение
 */
export const addMessage = createAsyncThunk<ReturnedType, ArgsProps, AppThunkProps>(
    "messages/add",
    async (data, {signal}) => {
        return await apiRequest("post", `message`, {data, signal, api2: true})
    },
)
