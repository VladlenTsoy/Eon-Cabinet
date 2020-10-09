import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {TeacherThunkProps} from "../store";

export const fetchAlgorithms = createAsyncThunk<any, undefined, TeacherThunkProps>(
    'algorithm/fetch',
    async () => {
        return await apiRequest('get', 'teacher/algorithms', {api2: true});
    }
)