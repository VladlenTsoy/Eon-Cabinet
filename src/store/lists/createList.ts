import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "../../utils/api"

interface ArgProps {
    task: string
    setting: any
}

type ReturnedType = any

export const createList = createAsyncThunk<
    ReturnedType,
    ArgProps,
    AppThunkProps
>("list/create", async ({setting, task}, {signal}) => {
    return await apiRequest(
        "post",
        task === "24"
            ? `/custom-exercises/${setting.custom_exercises_id}/print`
            : `/algorithm/list`,
        {signal, api2: true, data: {setting}}
    )
})
