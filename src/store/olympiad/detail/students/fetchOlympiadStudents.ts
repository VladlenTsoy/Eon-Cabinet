import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppThunkProps} from "store";
import {apiRequest} from "../../../../utils/api";

type ReturnedType = any

type ArgProps = {
    stepId: number
}

export const fetchOlympiadStepStudents = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    'teacher/olympiad/step/students/fetch',
    async ({stepId}, {signal}) => {
        return await apiRequest('get', `teacher/olympiad/step/${stepId}/students`, {signal});
    }
)
