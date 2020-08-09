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
            const {students} = getState()
            if (students.statistic.students.count !== 0) return false
        },
    }
)