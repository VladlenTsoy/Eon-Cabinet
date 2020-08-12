import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
    groupId: number;
    force?: boolean;
}

export const fetchStudentsHomeworkDates: any = createAsyncThunk<any, AgrProps>(
    'students/fetch/homework/dates',
    async ({groupId}, {signal, getState}) => {
        // @ts-ignore
        const {students} = getState();
        return await apiRequest('post', `/teacher/students/${groupId}/homework/dates`, {
            signal,
            data: {startOfWeek: students.homework.startOfWeek, endOfWeek: students.homework.endOfWeek}
        });
    },
)