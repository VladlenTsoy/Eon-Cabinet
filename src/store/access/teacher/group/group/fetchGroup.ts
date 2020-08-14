import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {GroupProps} from "../groupSlice";
import {TeacherThunkProps} from "../../store";

type ReturnedType = GroupProps

interface AgrProps {
    groupId: number
}

export const fetchGroup = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'group/fetch/group',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `teacher/group/${groupId}`, {signal});
    },
    {
        condition({groupId}, {getState, extra}) {
            const {group} = getState();

            if (group.groups.data.length) {
                const checkGroup = group.groups.data.find((group) => group.id === Number(groupId));
                extra = checkGroup;
                if (checkGroup) return false;
            }
        },
        dispatchConditionRejection: true
    }
)