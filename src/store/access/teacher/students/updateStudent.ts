import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api.old";
import {message} from "../../../../utils/message";

interface ParamsProps {
    studentId: number;
    data: object
}

export const updateStudent: any = createAsyncThunk<any, ParamsProps, any>(
    'teacher/student/update',
    async ({studentId, data}) => {
        //
        const response = await apiRequest('post', `teacher/student/${studentId}`, {data});
        response && message({type: 'success', content: "Вы успешно изменили данные ученика!"});
        return response;
    }
)