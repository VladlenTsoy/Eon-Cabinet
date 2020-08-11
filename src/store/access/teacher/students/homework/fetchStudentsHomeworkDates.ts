import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
    groupId: number;
    startOfWeek: any;
    endOfWeek: any;
    force?: boolean;
}

export const fetchStudentsHomeworkDates: any = createAsyncThunk<any, AgrProps>(
    'students/fetch/homework/dates',
    async ({groupId, startOfWeek, endOfWeek}, {signal}) => {
        return await apiRequest('post', `/teacher/students/${groupId}/homework/dates`, {
            signal,
            data: {startOfWeek, endOfWeek}
        });
    },
    {
        condition({groupId, force}, {getState}: any): any {
            // if (!groupId) return false;
            // if (force) return true;
            //
            // const {group, students} = getState();
            // if (group.group && group.group.id === Number(groupId) && Object.values(students.homework.data).length) return false;
        },
        dispatchConditionRejection: true
    }
)