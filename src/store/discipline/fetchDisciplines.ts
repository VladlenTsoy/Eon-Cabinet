import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {AppThunkProps} from "store";
import {Discipline} from "../../lib/types/common/Discipline";

type ReturnedType = Discipline[]

export const fetchDisciplines = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    'teacher/discipline/fetch',
    async () => {
        return await apiRequest('get', 'teacher/disciplines', {api2: true})
    }
)
