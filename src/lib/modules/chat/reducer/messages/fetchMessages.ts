import {Message} from "../../interfaces/Message"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../../../../../store/common/store"
import {apiRequest} from "../../../../../utils/api"
import {User} from "../../../../types/common/User"

type ReturnedType = Message[]

interface ArgsProps {
    userId: User["id"],
}

export const fetchMessages = createAsyncThunk<ReturnedType, ArgsProps, CommonThunkProps>(
    "messages/user/fetch",
    async ({userId}, {signal}) => {
        return await apiRequest("get", `messages/user/${userId}`, {signal, api2: true})
    },
)