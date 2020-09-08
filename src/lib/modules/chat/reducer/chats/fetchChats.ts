import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../../../../../store/common/store"
import {apiRequest} from "../../../../../utils/api"
import {Chat} from "../../interfaces/Chat"

type ReturnedType = Chat[]

export const fetchChats = createAsyncThunk<ReturnedType, undefined, CommonThunkProps>(
    "chats/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `contacts`, {signal, api2: true})
    },
    {
        condition(_, {getState}) {
            const {chats} = getState();
            return !chats.ids.length
        }
    }
)