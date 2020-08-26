import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api";
import {message} from "../../../utils/message";
import {CommonThunkProps} from "../store";
import {User} from "../../../lib/types/common/User";

type ReturnedType = User

interface ArgsProps {
    userId: User['id'];
    data: object
}

export const updateUser = createAsyncThunk<ReturnedType, ArgsProps, CommonThunkProps>(
    'user/update',
    async ({userId, data}) => {
        //
        const response = await apiRequest('patch', `/${userId}`, {data});
        response && message({type: 'success', content: 'Вы успешно обновили данные пользователя!'});
        return response;
    }
)