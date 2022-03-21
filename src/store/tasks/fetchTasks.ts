import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {Task} from "../../lib/types/teacher/Task";
import {AppThunkProps} from "store";

type ReturnedType = Task[]

export const fetchTasks = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    'tasks/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `/tasks`, {type: 'teacher', signal, api2: true});
    },
    {
        condition(_, {getState}: any): any {
            const {tasks} = getState();
            if (tasks.all.length)
                return false;
        }
    }
)
