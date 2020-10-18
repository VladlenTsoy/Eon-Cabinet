import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "lib/ui";
import {Homework} from "../../../../lib/types/teacher/Homework";
import {TeacherThunkProps} from "../store";

interface ArgProps {
    homeworkId: Homework['id']
    data: {
        level: number
        category_id: string
        method_id: number | undefined
    }
}

type ReturnedType = Homework

export const updateHomework = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/homework/update',
    async ({homeworkId, data}, {getState}) => {
        //
        const {discipline} = getState();
        data.method_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('put', `teacher/homework/${homeworkId}`, {data});
        response && message({type: 'success', content: 'Вы успешно изменили домашнее задание!'});
        return response;

    }
)