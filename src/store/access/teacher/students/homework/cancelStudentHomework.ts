import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api.old";
import {message} from "../../../../../utils/message";

export const cancelStudentHomework: any = createAsyncThunk<string, any, any>(
    'teacher/student/cancel/homework',
    async (homeworkId) => {
        //
        const response = await apiRequest('post', `teacher/homework/cancel`, {data: {sent_id: homeworkId}});
        response && message({type: 'success', content: 'Вы успешно отменили домашнее задание!'});
        return homeworkId;
    }
)