import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
    groupId: number;
    force?: boolean;
}

export const fetchStudentsHomework: any = createAsyncThunk<any, AgrProps>(
    'students/fetch/homework',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `/teacher/students/${groupId}/homework`, {signal});
    },
    {
        condition({groupId, force}, {getState}: any): any {
            if (!groupId) return false;
            if (force) return true;

            const {group, students} = getState();
            if (group.group && group.group.id === Number(groupId) && Object.values(students.homework.data).length) return false;
        },
        dispatchConditionRejection: true
    }
)