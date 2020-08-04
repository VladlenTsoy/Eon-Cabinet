import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";

export const fetchLanguage: any = createAsyncThunk(
    'language/fetch',
    async (abbr, {signal}) => {
        return await apiRequest('get', 'language', {signal, type: "guest", params: {abbr}});
    }
)