import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../../../utils/api";
import {message} from "../../../../utils/message";

interface ParamsProps {
    olympiadId: string | number;
    data: object
}

export const updateOlympiad: any = createAsyncThunk<any, ParamsProps, any>(
    'teacher/olympiad/update',
    async ({olympiadId, data}) => {
        try {
            const response = await api.user.patch(`teacher/olympiad/${olympiadId}`, data);
            message({type: 'success', content: 'Вы успешно создали олимпиаду!'});
            return response.data
        } catch (e) {
            message({type: 'error', content: 'Неизвестная ошибка!'});
            return [];
        }
    }
)