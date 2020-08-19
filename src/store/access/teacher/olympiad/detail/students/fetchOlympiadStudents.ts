import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../../../store";
import {apiRequest} from "../../../../../../utils/api";

type ReturnedType = any

type ArgProps = {
    stepId: number
}

export const fetchOlympiadStepStudents = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/olympiad/step/students/fetch',
    async ({stepId}, {signal}) => {
        return await apiRequest('get', `teacher/olympiad/step/${stepId}/students`, {signal});
    }
)