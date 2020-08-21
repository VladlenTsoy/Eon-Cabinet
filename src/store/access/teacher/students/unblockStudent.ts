import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../store";
import {apiRequest} from "../../../../utils/api";
import {Student} from "../../../../lib/types/teacher/Student";

type ReturnedType = {
    data: { day_unblock: number },
    studentId: Student['id'],
}

interface ArgProps {
    studentId: Student['id']
}

export const unblockStudent = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/student/unblock',
    async ({studentId}) => {
        const response = await apiRequest('post', `/${studentId}/unblock`)
        return {studentId, data: response};
    }
)