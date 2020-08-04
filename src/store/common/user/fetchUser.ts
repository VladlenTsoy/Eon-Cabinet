import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {AppDispatch, StoreState} from "../../store";
import {User} from "./userSlice";
import cookie from "js-cookie";

interface Options {
    dispatch: AppDispatch
    state: StoreState
    extra: any
}

export const fetchUser: any = createAsyncThunk<User, any, Options>(
    'user/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `/`, {signal})
            .catch((e) => {
                if (e.message === 'error_token')
                    cookie.remove('token_access');
            }) as User;
    },
    {
        condition(_): any {
            if (!cookie.get('token_access'))
                return false;
        },
        dispatchConditionRejection: true
    }
);