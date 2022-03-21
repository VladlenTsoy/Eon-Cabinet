import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "../../utils/api"
import {Student} from "../../lib/types/teacher/Student"

type ReturnedType = {
    data: {day_block: number},
    studentId: Student["id"],
}

interface ArgProps {
    studentId: Student["id"]
}

export const blockStudent = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    "teacher/student/block",
    async ({studentId}) => {
        const response = await apiRequest("post", `/${studentId}/block`, {api2: true})
        return {studentId, data: response}
    }
)
