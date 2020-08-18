import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {AdminThunkProps} from "../store";

type ReturnedType = any

type ArgsType = undefined

export const fetchDisciplines = createAsyncThunk<ReturnedType, ArgsType, AdminThunkProps>(
    'admin/discipline/fetch',
    async () => {
        return await apiRequest('get', 'admin/disciplines')
    }
)