import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppThunkProps} from "store";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";

type ArgProps = any

type ReturnedType = any

export const createCustomExercises = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    'custom-exercises/create',
    async (data, {signal}) => {
        const response = await apiRequest('post', `/teacher/custom-exercises`, {signal, data})
        response && message({type: "success", content: 'Вы успешно создали примеры!'})
        return response
    }
)
