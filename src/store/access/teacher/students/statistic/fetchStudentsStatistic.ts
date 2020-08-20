import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";
import {StatisticState} from "./statistic";

type ReturnedType = {
    homework: StatisticState['homework']
    students: StatisticState['students']
}

export const fetchStudentsStatistic = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'teacher/students/statistic',
    async (_, {signal}) => {
        return await apiRequest('get', `/students/statistic`, {signal, type: "teacher"});
    },
    {
        condition(_, {getState}) {
            const {students} = getState()
            if (students.statistic.force) return true;
            if (students.statistic.students.count !== 0) return false
        },
    }
)