import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";

export const createHomework: any = createAsyncThunk<string, any, any>(
    'teacher/homework/create',
    async ({duplicate, data}, {getState}: any) => {
        //
        const {discipline} = getState();
        data.method_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('post', `teacher/homework`, {data});
        response && message({
            type: 'success',
            content: duplicate ? 'Вы успешно продублировали домашнее задание!' : 'Вы успешно создали домашнее задание!'
        });
        return response;
    }
)