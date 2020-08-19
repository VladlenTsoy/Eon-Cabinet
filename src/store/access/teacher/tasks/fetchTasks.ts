import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {Task} from "../../../../lib/types/teacher/Task";
import {TeacherThunkProps} from "../store";

type ReturnedType = Task[]

export const fetchTasks = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'tasks/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `/tasks`, {type: 'teacher', signal});
    },
    {
        condition(_, {getState}: any): any {
            const {tasks} = getState();
            if (tasks.all.length)
                return false;
        }
    }
)