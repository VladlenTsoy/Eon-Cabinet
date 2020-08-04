import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api.old";

export const logoutUser:any = createAsyncThunk(
    'user/logout',
    async (_, {signal}) => {
        return await apiRequest('delete', `logout`, {signal});
    },
);