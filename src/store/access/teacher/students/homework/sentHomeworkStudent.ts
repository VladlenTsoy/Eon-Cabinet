import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {TeacherThunkProps} from "../../store";

type ReturnedType = { status: 'success' }

interface AgrProps {
    homework: number
    message?: string
}

export const sentHomeworkStudents = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/students/sent/homework',
    async (arg, {getState}) => {
        const {student} = getState();
        const data = {...arg, userIds: student.selectedIds};
        //
        const response = await apiRequest('post', `teacher/homework/send`, {data});
        response && message({type: 'success', content: 'Вы успешно отправили домашнее задание!'});
        return response;
    }
)