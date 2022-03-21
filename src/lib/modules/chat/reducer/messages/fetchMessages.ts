import {Message} from "../../interfaces/Message"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store/store"
import {apiRequest} from "../../../../../utils/api"
import {User} from "../../../../types/common/User"

type ReturnedType = Message[]

interface ArgsProps {
    userId: User["id"],
}

/**
 * Вывод всех не прочитанных сообщений
 */
export const fetchMessages = createAsyncThunk<ReturnedType, ArgsProps, AppThunkProps>(
    "messages/user/fetch",
    async ({userId}, {signal}) => {
        return await apiRequest("get", `messages/user/${userId}`, {signal, api2: true})
    },
)
