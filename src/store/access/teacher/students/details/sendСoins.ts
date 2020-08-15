import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {TeacherThunkProps} from "../../store";

type ReturnedType = {
    ids: number[]
    coin: number
}

interface ParamsProps {
    ids: number[]
    coin: number
}

export const sendCoins = createAsyncThunk<ReturnedType, ParamsProps, TeacherThunkProps>(
    'teacher/student/send/coins',
    async (data) => {
        //
        const response = await apiRequest('post', `teacher/coin/sent`, {data});
        response && message({type: 'success', content: "Вы успешно отправили монеты!"});
        return data;
    }
)