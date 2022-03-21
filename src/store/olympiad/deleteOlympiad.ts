import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";
import {AppThunkProps} from "store";

type ArgProps = {
    olympiadId: number
}

type ReturnedType = any

export const deleteOlympiad = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    'teacher/olympiad/delete',
    async ({olympiadId}, {signal}) => {
        const response = await apiRequest('post', `teacher/olympiad/${olympiadId}`, {signal});
        response && message({type: 'success', content: 'Вы успешно завершили олипиаду!'});
        return response;
    }
)
