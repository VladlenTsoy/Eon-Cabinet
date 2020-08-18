import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import cookie from "js-cookie";
import {User} from "../../../lib/types/common/User";
import {CommonThunkProps} from "../store";

type ReturnedType = User

export const fetchUser = createAsyncThunk<ReturnedType, undefined, CommonThunkProps>(
    'user/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `/`, {signal})
            .catch((e) => {
                if (e.message === 'error_token')
                    cookie.remove('token_access');
            }) as User;
    },
    {
        condition(_) {
            if (!cookie.get('token_access'))
                return false;
        },
        dispatchConditionRejection: true
    }
);