import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store/store"
import {apiRequest} from "../../../../../utils/api"
import {Contact} from "../../interfaces/Contact"

type ReturnedType = Contact[]

interface AgrProps {
    search: string
}

export const fetchContactsBySearch = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "contact/search/fetch",
    async (data, {signal}) => {
        return await apiRequest("post", `contacts/search`, {signal, api2: true, data})
    },
)
