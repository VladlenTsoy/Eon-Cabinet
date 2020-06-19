import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../../../utils/api";
import {message} from "../../../../utils/message";

export const createOlympiad: any = createAsyncThunk<string, object>(
    'teacher/olympiad/create',
    async (data) => {
        try {
            const response = await api.user.post('teacher/olympiad', data)
            message({type: 'success', content: 'Вы успешно создали олимпиаду!'});
            return response.data;
        } catch (e) {
            message({type: 'error', content: 'Неизвестная ошибка!'});
            return [];
        }
    }
)