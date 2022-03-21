import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "../../utils/api"
import {StudentSentHomeworkTask} from "../../lib/types/teacher/StudentHomework"

type ReturnedType = StudentSentHomeworkTask[]

interface AgrProps {
    sentId: number
}

export const fetchStudentsHomeworkTasks = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "fetch/student/homework/tasks",
    async ({sentId}, {signal}) => {
        return await apiRequest("get", `/teacher/student/homework/${sentId}/tasks`, {
            api2: true,
            signal
        })
    }
)
