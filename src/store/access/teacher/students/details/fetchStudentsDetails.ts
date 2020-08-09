import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
    groupId: number;
    force?: boolean;
}

export const fetchStudentsDetails: any = createAsyncThunk<any, AgrProps>(
    'students/fetch/details',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `/teacher/students/${groupId}`, {signal});
    },
    {
        condition({groupId, force}, {getState}: any): any {
            if(!groupId) return false;

            const {group, students} = getState();
            if (group.group && group.group.id === Number(groupId) && Object.values(students.details).length) return false;
        },
        dispatchConditionRejection: true
    }
)