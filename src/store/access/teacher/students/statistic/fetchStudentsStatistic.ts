import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";

interface AgrProps {
    force?: boolean;
}

export const fetchStudentsStatistic = createAsyncThunk<any, AgrProps, TeacherThunkProps>(
    'students/statistic',
    async (_, {signal}) => {
        return await apiRequest('get', `/students/statistic`, {signal, type: "teacher"});
    },
    {
        condition({force}, {getState}) {
            const {students} = getState()
            if (students.statistic.students.count !== 0) return false
        },
    }
)