import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api";

import {detect} from 'detect-browser';

const browser = detect();

export const registrationUser: any = createAsyncThunk(
    'user/registration',
    async (data: any, {signal}) => {
        data.browser = browser?.name
        data.browserVersion = browser?.version
        data.device = browser?.os
        data.screen = {
            width: window.screen.width,
            height: window.screen.height
        }
        return await apiRequest('post', `registration`, {data, signal, type: 'guest'});
    }
);