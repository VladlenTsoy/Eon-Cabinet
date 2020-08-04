import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";

interface DataProps {
    verification_code: string;
}

export const verificationCodeConfirmEmail: any = createAsyncThunk(
    'user/verification-code-confirm-email',
    async (data: DataProps, {signal}) => {
        return await apiRequest('post', `email-confirmation/verification-code`, {signal, data});
    },
)