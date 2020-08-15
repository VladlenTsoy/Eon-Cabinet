import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {TeacherThunkProps} from "../store";
import {Student} from "../students/studentsSlice";

type ReturnedType = any

interface ArgProps {
    studentId: Student['id']
}

export const fetchStudent = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/student/fetch',
    async ({studentId}) => {
        return await apiRequest('get', `/teacher/student/${studentId}`);
    }
)