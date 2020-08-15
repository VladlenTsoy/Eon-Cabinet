import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";
import {Homework} from "./homework";

type ReturnedType = { [userId: number]: Homework[] }

interface AgrProps {
    groupId: number;
    force?: boolean;
}

export const fetchStudentsHomework = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'students/fetch/homework',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `/teacher/students/${groupId}/homework`, {signal});
    },
    {
        condition({groupId, force}, {getState}) {
            if (!groupId) return false;
            if (force) return true;

            const {group, students} = getState();
            if (group.group.detail?.id === Number(groupId) && Object.values(students.homework.data).length) return false;
        },
        dispatchConditionRejection: true
    }
)