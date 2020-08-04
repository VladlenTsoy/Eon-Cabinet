import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api.old";

export const fetchDisciplines: any = createAsyncThunk(
    'discipline/fetch',
    async () => {
        return await apiRequest('get', 'teacher/disciplines')
    }
)