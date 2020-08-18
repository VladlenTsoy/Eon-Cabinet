import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {detect} from 'detect-browser';
import {CommonThunkProps} from "../store";

const browser = detect();

interface ArgsProps {
    login: string
    password: string
}

interface ReturnedType {
    token: string
}

// Аторизация пользователя
export const authUser = createAsyncThunk<ReturnedType, ArgsProps, CommonThunkProps>(
    'user/auth',
    async (data, {signal}) => {
        const detect = {
            browser: browser?.name,
            browserVersion: browser?.version,
            device: browser?.os,
            screen: {
                width: window.screen.width,
                height: window.screen.height
            },
        }
        return await apiRequest('post', `login`, {data: {...data, ...detect}, signal, type: 'guest'});
    },
)