import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {detect} from 'detect-browser';

const browser = detect();

export const authUser: any = createAsyncThunk(
    'user/auth',
    async (data: any, {signal}) => {
        data.browser = browser?.name
        data.browserVersion = browser?.version
        data.device = browser?.os
        data.screen = {
            width: window.screen.width,
            height: window.screen.height
        }
        return await apiRequest('post', `login`, {data, signal, type: 'guest'});
    },
)