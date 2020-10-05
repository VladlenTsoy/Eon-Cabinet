import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {TeacherThunkProps} from "../store";
import {StudentHomework} from "./studentHomeworkSlice";

type ReturnedType = { [week: number]: { [userId: number]: StudentHomework[] } }

interface AgrProps {
    groupId: number;
    force?: boolean;
}

export const fetchStudentsHomeworkDates = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'students/fetch/homework/dates',
    async ({groupId}, {signal, getState}) => {
        const {studentHomework} = getState();
        return await apiRequest('post', `/teacher/students/${groupId}/homework/dates`, {
            api2: true,
            signal,
            data: {startOfWeek: studentHomework.startOfWeek, endOfWeek: studentHomework.endOfWeek}
        });
    },
)