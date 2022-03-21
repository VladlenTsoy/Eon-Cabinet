import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AppThunkProps} from "store"
import {Language} from "../../lib/types/common/Language"

type ReturnedType = {
    id: string
    title: string
    abbr: string
    data: any
    languages: Language[]
}

interface AgrProps {
    abbr: Language["abbr"]
}

export const fetchLanguage = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "language/fetch",
    async ({abbr}, {signal}) => {
        return await apiRequest("get", "language", {signal, api2: true, type: "guest", params: {abbr}})
    }
)
