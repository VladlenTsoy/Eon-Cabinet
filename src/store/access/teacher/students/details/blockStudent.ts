import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../../store";
import {apiRequest} from "../../../../../utils/api";
import {Student} from "../../../../../lib/types/teacher/Student";

type ReturnedType = {
    data: { day_block: number },
    studentId: Student['id'],
}

interface ArgProps {
    studentId: Student['id']
}

export const blockStudent = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/student/block',
    async ({studentId}) => {
        const response = await apiRequest('post', `/${studentId}/block`)
        return {studentId, data: response};
    }
)