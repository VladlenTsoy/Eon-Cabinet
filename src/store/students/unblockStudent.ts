import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "../../utils/api"
import {Student} from "../../lib/types/teacher/Student"

type ReturnedType = {
    data: {day_unblock: number},
    studentId: Student["id"],
}

interface ArgProps {
    studentId: Student["id"]
}

export const unblockStudent = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    "teacher/student/unblock",
    async ({studentId}) => {
        const response = await apiRequest("post", `/${studentId}/unblock`, {api2: true})
        return {studentId, data: response}
    }
)
