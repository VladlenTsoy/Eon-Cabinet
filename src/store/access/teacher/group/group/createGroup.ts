import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";

export const createGroup: any = createAsyncThunk<string, any, any>(
    'teacher/group/create',
    async (data, {getState}: any) => {
        //
        const {discipline} = getState();
        data.method_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('post', `teacher/group`, {data});
        response && message({type: 'success', content: 'Вы успешно создали группу!'});
        return response;
    }
)