import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";

interface AgrProps {
    groupId: number;
    force?: boolean;
}

export const fetchStudentsDetails = createAsyncThunk<any, AgrProps, TeacherThunkProps>(
    'students/fetch/details',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `/teacher/students/${groupId}`, {signal});
    },
    {
        condition({groupId, force}, {getState}) {
            if(!groupId) return false;

            const {group, students} = getState();
            if (group.group.detail?.id === Number(groupId) && Object.values(students.details).length) return false;
        },
        dispatchConditionRejection: true
    }
)