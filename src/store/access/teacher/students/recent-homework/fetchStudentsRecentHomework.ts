import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";
import {RecentHomeworkDetails} from "./recentHomework";

type ReturnedType = RecentHomeworkDetails[]

interface AgrProps {
    force?: boolean;
}

// Загрузка последних отправленных домашних заданий
export const fetchStudentsRecentHomework = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'students/recent/homework',
    async (_, {signal}) => {
        return await apiRequest('get', `students/recent/homework`, {signal, type: "teacher"})
    },
    {
        condition({force}, {getState}) {
            const {students} = getState()
            if (students.recentHomework.data.length) return false
        },
    }
)