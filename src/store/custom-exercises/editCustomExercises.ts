import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppThunkProps} from "store";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";

type ArgProps = any

type ReturnedType = any

export const editCustomExercises = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    'custom-exercises/edit',
    async (data, {signal}) => {
        const response = await apiRequest('patch', `/teacher/custom-exercises`, {signal, data})
        response && message({type: "success", content: 'Вы успешно изменили примеры!'})
        return response
    }
)
