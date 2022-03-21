import {Chat} from "../../interfaces/Chat"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store/store"
import {apiRequest} from "../../../../../utils/api"
import {Contact} from "../../interfaces/Contact"

type ReturnedType = Chat

interface ArgProps {
    contactId: Contact['id']
}

export const createChat = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    "chats/create",
    async (data, {signal}) => {
        return await apiRequest("post", `chat`, {signal, api2: true, data})
    },
    {
        condition({contactId}, {getState}) {
            const {chats} = getState();
            const chat = Object.values(chats.entities).find(chat => chat && chat.contact.id === contactId)

            return !!chat
        }
    }
)
