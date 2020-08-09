import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
    force?: boolean;
}

export const fetchStudentsRecentHomework: any = createAsyncThunk<any, AgrProps, any>(
    'students/recent/homework',
    async (_, {signal}) => {
        return await apiRequest('get', `students/recent/homework`, {signal, type: "teacher"})
    },
    {
        condition({force}, {getState}: any) {
            const {students} = getState()
            if (students.recentHomework.data.length) return false
        },
    }
)