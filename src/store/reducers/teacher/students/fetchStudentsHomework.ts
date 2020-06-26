import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

interface AgrProps {
    groupId: number;
}

export const fetchStudentsHomework: any = createAsyncThunk<any, AgrProps>(
    'students/fetch/homework',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `/teacher/students/${groupId}`, {signal});
    },
    {
        condition({groupId}, {getState}: any): any {
            const {group} = getState();
            if (group.group && group.group.id === Number(groupId)) return false;
        },
        dispatchConditionRejection: true
    }
)