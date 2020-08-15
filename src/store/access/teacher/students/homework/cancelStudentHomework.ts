import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {TeacherThunkProps} from "../../store";

export const cancelStudentHomework: any = createAsyncThunk<number, number, TeacherThunkProps>(
    'teacher/student/cancel/homework',
    async (homeworkId) => {
        //
        const response = await apiRequest('post', `teacher/homework/cancel`, {data: {sent_id: homeworkId}});
        response && message({type: 'success', content: 'Вы успешно отменили домашнее задание!'});
        return homeworkId;
    }
)