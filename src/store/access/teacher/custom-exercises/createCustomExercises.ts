import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../store";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";

type ArgProps = any

type ReturnedType = any

export const createCustomExercises = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'custom-exercises/create',
    async (data, {signal}) => {
        const response = await apiRequest('post', `/teacher/custom-exercises`, {signal, data})
        response && message({type: "success", content: 'Вы успешно создали примеры!'})
        return response
    }
)