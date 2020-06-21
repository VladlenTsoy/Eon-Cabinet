import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

interface AgrProps {
    activeDisciplineId: string;
}

export const fetchTasks: any = createAsyncThunk<any, AgrProps>(
    'tasks/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `/tasks`, {type: 'teacher', signal});
    },
    {
        condition({activeDisciplineId}, {getState}: any): any {
            const {tasks} = getState();

            if (!activeDisciplineId)
                return false;

            const checkDiscipline = tasks.all.find((task: any) => task.discipline_id === Number(activeDisciplineId));
            if (tasks.all.length && checkDiscipline)
                return false;
        }
    }
)