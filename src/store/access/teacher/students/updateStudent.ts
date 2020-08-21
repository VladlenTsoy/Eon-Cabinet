import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";
import {TeacherThunkProps} from "../store";

interface ParamsProps {
    studentId: number;
    data: object
}

export const updateStudent = createAsyncThunk<any, ParamsProps, TeacherThunkProps>(
    'teacher/student/update',
    async ({studentId, data}) => {
        //
        const response = await apiRequest('post', `teacher/student/${studentId}`, {data});
        response && message({type: 'success', content: "Вы успешно изменили данные ученика!"});
        return response;
    }
)