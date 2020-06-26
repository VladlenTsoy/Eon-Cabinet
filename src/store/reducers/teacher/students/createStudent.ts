import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";

export const createStudent: any = createAsyncThunk<string, any, any>(
    'teacher/students/create',
    async (data) => {
        //
        const response = await apiRequest('post', `teacher/student`, {data});
        response && message({type: 'success', content: 'Вы успешно добавили ученика!'});
        return response;
    }
)