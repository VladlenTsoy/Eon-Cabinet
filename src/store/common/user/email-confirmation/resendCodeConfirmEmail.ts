import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {message} from "../../../../utils/message";

export const resendCodeConfirmEmail: any = createAsyncThunk(
    'user/resend-code-confirm-email',
    async (_: any, {signal}) => {
        const response = await apiRequest('get', `email-confirmation/resend-code`, {signal});

        if (response?.message)
            message({type: 'success', content: `${response.message}!`})

        return response;
    },
)