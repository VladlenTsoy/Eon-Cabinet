import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {AppThunkProps} from "store";

type ReturnedType = any

interface ArgProps {
    user: any
    setting: any
    requestSetting: { url: string, method?: 'post' | 'get', setting?: any },
}

export const fetchGameExercises = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    'game/fetch/exercises',
    async ({requestSetting, user, setting}, {signal}) => {
        const dataParams = requestSetting.method === 'post' ? {data: requestSetting.setting || setting} : {params: requestSetting.setting || setting}
        return await apiRequest(requestSetting.method || 'get', requestSetting.url, {
            signal,
            type: user ? 'user' : 'guest', ...dataParams
        });
    },
)
