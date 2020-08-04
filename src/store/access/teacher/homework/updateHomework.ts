import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api.old";
import {message} from "../../../../utils/message";

export const updateHomework: any = createAsyncThunk<string, any, any>(
    'teacher/homework/update',
    async ({homeworkId, data}, {getState}: any) => {
        //
        const {discipline} = getState();
        data.method_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('put', `teacher/homework/${homeworkId}`, {data});
        response && message({type: 'success', content: 'Вы успешно изменили домашнее задание!'});
        return response;

    }
)