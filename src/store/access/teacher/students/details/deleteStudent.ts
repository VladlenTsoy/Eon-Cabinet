import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api.old";
import {message} from "../../../../../utils/message";

export const deleteStudent: any = createAsyncThunk<string, any, any>(
    'teacher/student/delete',
    async (studentId) => {
        //
        const response = await apiRequest('delete', `teacher/student/${studentId}`);
        response && message({type: 'success', content: 'Вы успешно удалили ученика!'});
        return studentId;
    }
)