import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {TeacherThunkProps} from "../../store";
import {Student} from "../../../../../lib/types/teacher/Student";

type ReturnedType = Student

type ArgProps = any

export const createStudent = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/students/create',
    async (data) => {
        //
        const response = await apiRequest('post', `teacher/student`, {data});
        response && message({type: 'success', content: 'Вы успешно добавили ученика!'});
        return response;
    }
)