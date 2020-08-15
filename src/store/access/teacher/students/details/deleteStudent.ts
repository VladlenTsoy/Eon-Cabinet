import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {TeacherThunkProps} from "../../store";

export const deleteStudent = createAsyncThunk<number, number, TeacherThunkProps>(
    'teacher/student/delete',
    async (studentId) => {
        //
        const response = await apiRequest('delete', `teacher/student/${studentId}`);
        response && message({type: 'success', content: 'Вы успешно удалили ученика!'});
        return studentId;
    }
)