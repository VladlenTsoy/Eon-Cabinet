import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";
import {TeacherThunkProps} from "../store";
import {Student} from "../../../../lib/types/teacher/Student";

type ReturnedType = Student

type ArgProps = {
    first_name: Student['first_name']
    last_name: Student['last_name']
    login: Student['login']
    password: string
    group_id: Student['group_id']
    image?: Student['image']
    email?: Student['email']
    phone?: Student['phone']
    date_of_birth?: Student['date_of_birth']
}

// Создание ученика
export const createStudent = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/students/create',
    async (data) => {
        //
        const response = await apiRequest('post', `teacher/student`, {data});
        response && message({type: 'success', content: 'Вы успешно добавили ученика!'});
        return response;
    }
)