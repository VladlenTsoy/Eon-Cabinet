import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

export const fetchCategories: any = createAsyncThunk(
    'category/fetch',
    async () => {
        return apiRequest('get', 'categories', {type: "teacher"})
    }
)