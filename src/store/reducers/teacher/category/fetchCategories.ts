import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../../../utils/api";
import {message} from "../../../../utils/message";

export const fetchCategories: any = createAsyncThunk(
    'category/fetch',
    async () => {
        try {
            const response = await api.teacher.get('categories')
            return response.data;
        } catch (e) {
            message({type: 'error', content: 'Неизвестная ошибка!'});
            return [];
        }
    }
)