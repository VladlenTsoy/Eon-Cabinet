import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";
import {AppThunkProps} from "store";

export const deleteStudent = createAsyncThunk<number, number, AppThunkProps>(
    'teacher/student/delete',
    async (studentId) => {
        //
        const response = await apiRequest('delete', `/${studentId}`, {api2: true});
        response && message({type: 'success', content: 'Вы успешно удалили ученика!'});
        return studentId;
    }
)
