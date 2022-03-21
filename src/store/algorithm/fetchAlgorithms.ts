import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {AppThunkProps} from "store";

export const fetchAlgorithms = createAsyncThunk<any, undefined, AppThunkProps>(
    'algorithm/fetch',
    async () => {
        return await apiRequest('get', 'teacher/algorithms', {api2: true});
    }
)
