import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";
import {TeacherThunkProps} from "../store";
import {Homework} from "../../../../lib/types/teacher/Homework";

interface AgrProps {
    duplicate: boolean
    data: {
        level: number
        category_id: string
        method_id: number | undefined
    }
}

type ReturnedType = Homework

export const createHomework = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/homework/create',
    async ({duplicate, data}, {getState}) => {
        //
        const {discipline} = getState();
        data.method_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('post', `teacher/homework`, {data});
        response && message({
            type: 'success',
            content: duplicate ? 'Вы успешно продублировали домашнее задание!' : 'Вы успешно создали домашнее задание!'
        });
        return response;
    }
)