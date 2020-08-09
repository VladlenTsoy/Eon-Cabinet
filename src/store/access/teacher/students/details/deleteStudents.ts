import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api.old";
import {message} from "../../../../../utils/message";

export const deleteStudents: any = createAsyncThunk<number[], any, any>(
    'teacher/students/delete',
    async (studentIds) => {
        //
        const response = await apiRequest('delete', `teacher/students`, {data: {ids: studentIds}});
        response && message({
            type: 'success',
            content: studentIds.length > 1 ? 'Вы успешно удалили учеников!' : 'Вы успешно удалили ученика!'
        });
        return studentIds;
    }
)