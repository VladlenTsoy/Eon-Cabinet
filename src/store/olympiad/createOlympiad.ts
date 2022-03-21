import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";

export const createOlympiad: any = createAsyncThunk<string, any, any>(
    'teacher/olympiad/create',
    async (data, {getState}: any) => {
        const {discipline} = getState();
        data.discipline_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('post', `teacher/olympiad`, {data});
        response && message({
            type: 'success',
            content: 'Вы успешно создали олимпиаду!',
        });
        return response;
    }
)
