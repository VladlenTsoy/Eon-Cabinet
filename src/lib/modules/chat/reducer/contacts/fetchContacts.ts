import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../../../../../store/common/store"
import {apiRequest} from "../../../../../utils/api"
import {Contact} from "../../interfaces/Contact"

type ReturnedType = Contact[]

export const fetchContacts = createAsyncThunk<ReturnedType, undefined, CommonThunkProps>(
    "contacts/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `contacts`, {signal})
    },
    {
        condition(_, {getState}) {
            const {contacts} = getState();
            return !contacts.ids.length
        }
    }
)