import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";

export const sentHomeworkStudents: any = createAsyncThunk<string, any, any>(
    'teacher/students/sent/homework',
    async (_data, {getState}) => {
        const {students}: any = getState();
        const data = {..._data, userIds: students.selectedIds};
        //
        const response = await apiRequest('post', `teacher/homework/send`, {data});
        response && message({type: 'success', content: 'Вы успешно отправили домашнее задание!'});
        return response;
    }
)