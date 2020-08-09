import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api";
import {message} from "../../../utils/message";

interface ParamsProps {
    userId: string;
    data: object
}

export const updateUser: any = createAsyncThunk<any, ParamsProps, any>(
    'user/update',
    async ({userId, data}) => {
        //
        const response = await apiRequest('patch', `/${userId}`, {data});
        response && message({type: 'success', content: 'Вы успешно обновили данные пользователя!'});
        return response;
    }
)