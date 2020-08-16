import {Student} from "../../studentsSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../../../store";
import {apiRequest} from "../../../../../../utils/api";

type ReturnedType = any

interface ArgProps {
    studentId: Student['id']
    page: number
}

export const fetchStudentHomeworkPaginate = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/student/fetch/homework/paginate',
    async ({studentId, page}, {signal}) => {
        return await apiRequest('get', `/teacher/homework/student/${studentId}/paginate`, {params: {page}, signal});
    }
)