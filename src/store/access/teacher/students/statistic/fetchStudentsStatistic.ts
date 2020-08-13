import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
    force?: boolean;
}

export const fetchStudentsStatistic: any = createAsyncThunk<any, AgrProps, any>(
    'students/statistic',
    async (_, {signal}) => {
        return await apiRequest('get', `/students/statistic`, {signal, type: "teacher"});
    },
    {
        condition({force}, {getState}: any) {
            const {student} = getState()
            if (student.statistic.students.count !== 0) return false
        },
    }
)