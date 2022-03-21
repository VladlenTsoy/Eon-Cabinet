import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";
import {AppThunkProps} from "store";
import {User} from "../../lib/types/common/User";

type ReturnedType = User

interface ArgsProps {
    userId: User['id'];
    data: any
}

export const updateUser = createAsyncThunk<ReturnedType, ArgsProps, AppThunkProps>(
    'user/update',
    async ({userId, data}) => {
        //
        const response = await apiRequest('patch', `/${userId}`, {data, api2: true});
        response && message({type: 'success', content: 'Вы успешно обновили данные пользователя!'});
        return response;
    }
)
