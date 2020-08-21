import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";
import {Student} from "../../../../../lib/types/teacher/Student";

type ReturnedType = Student

interface ArgProps {
    studentId: Student['id']
}

export const fetchStudent = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/student/fetch',
    async ({studentId}) => {
        return await apiRequest('get', `/teacher/student/${studentId}`);
    },
    {
        condition({studentId}, {getState}) {
            const {students} = getState();
            if (students.ids.includes(studentId)) return false;
        },
        dispatchConditionRejection: true
    }
)