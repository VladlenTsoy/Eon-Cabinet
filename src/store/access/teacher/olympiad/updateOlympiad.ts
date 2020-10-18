import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "lib/ui";

interface ParamsProps {
    olympiadId: string | number;
    data: any
}

export const updateOlympiad: any = createAsyncThunk<any, ParamsProps, any>(
    'teacher/olympiad/update',
    async ({olympiadId, data}, {getState}: any) => {
        //
        const {discipline} = getState();
        data.discipline_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('patch', `teacher/olympiad/${olympiadId}`, {data});
        response && message({type: 'success', content: 'Вы успешно создали олимпиаду!'});
        return response;
    }
)