import {Chat} from "../../interfaces/Chat"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../../../../../store/common/store"
import {apiRequest} from "../../../../../utils/api"
import {Contact} from "../../interfaces/Contact"

type ReturnedType = Chat

interface ArgProps {
    contactId: Contact['id']
}

export const createChat = createAsyncThunk<ReturnedType, ArgProps, CommonThunkProps>(
    "chats/create",
    async (data, {signal}) => {
        return await apiRequest("post", `chat`, {signal, api2: true, data})
    },
)