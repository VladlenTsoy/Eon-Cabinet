import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store/store"
import {apiRequest} from "../../../../../utils/api"
import {Chat} from "../../interfaces/Chat"

type ReturnedType = Chat[]

export const fetchChats = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    "chats/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `chats`, {signal, api2: true})
    },
    {
        condition(_, {getState}) {
            const {chats} = getState();
            return !chats.ids.length
        }
    }
)
