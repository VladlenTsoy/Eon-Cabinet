import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../store";
import {apiRequest} from "../../../../utils/api";

type ReturnedType = any

type ArgProps = any

export const fetchOlympiad = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/olympiad/fetch',
    async ({olympiadId}, {signal}) => {
        return await apiRequest('get', `teacher/olympiad/${olympiadId}`, {signal});
    }
)