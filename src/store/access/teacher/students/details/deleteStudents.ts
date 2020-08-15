import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {TeacherThunkProps} from "../../store";

export const deleteStudents = createAsyncThunk<number[], number[], TeacherThunkProps>(
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