import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";

export const checkCodeConfirmEmail: any = createAsyncThunk(
    'user/check-code-confirm-email',
    async (_: any, {signal}) => {
        return await apiRequest('get', `email-confirmation/check-code`, {signal});
    },
)