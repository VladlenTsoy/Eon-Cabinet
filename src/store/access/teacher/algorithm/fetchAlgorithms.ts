import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

export const fetchAlgorithms: any = createAsyncThunk(
    'algorithm/fetch',
    async () => {
        return await apiRequest('get', 'teacher/algorithms');
    }
)