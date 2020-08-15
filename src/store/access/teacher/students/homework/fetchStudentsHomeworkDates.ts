import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";
import {Homework} from "./homework";

type ReturnedType = { [week: number]: { [userId: number]: Homework[] } }

interface AgrProps {
    groupId: number;
    force?: boolean;
}

export const fetchStudentsHomeworkDates = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'students/fetch/homework/dates',
    async ({groupId}, {signal, getState}) => {
        const {students} = getState();
        return await apiRequest('post', `/teacher/students/${groupId}/homework/dates`, {
            signal,
            data: {startOfWeek: students.homework.startOfWeek, endOfWeek: students.homework.endOfWeek}
        });
    },
)