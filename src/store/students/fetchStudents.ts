import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {AppThunkProps} from "store";

interface AgrProps {
    groupId: number;
    force?: boolean;
}

export const fetchStudents = createAsyncThunk<any, AgrProps, AppThunkProps>(
    'teacher/students/fetch/details',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `/teacher/students/${groupId}`, {signal, api2: true})
    },
    {
        condition({groupId, force}, {getState}) {
            if (!groupId) return false;

            const {group, students} = getState();
            const check = Object.values(students.entities).filter(student => student?.group_id === groupId)
            if (group.ids.includes(groupId) && check.length) return false;
        },
        dispatchConditionRejection: true
    }
)
