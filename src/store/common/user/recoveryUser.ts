import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"

export const forgotPassword: any = createAsyncThunk<any, any>(
    "forgot/password",
    async (data, {signal}) => {
        return await apiRequest("post", `/forgot-password`, {signal, api2: true, data, type: "guest"})
    }
)

export const checkCodeForResetPassword: any = createAsyncThunk<any, any>(
    "forgot/password/check-code",
    async (data, {signal}) => {
        return await apiRequest("post", `/forgot-password-check-code`, {signal, api2: true, data, type: "guest"})
    }
)