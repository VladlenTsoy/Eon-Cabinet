import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";
import {Group} from "../../../../../lib/types/teacher/Group";

type ReturnedType = Group

interface AgrProps {
    groupId: Group['id']
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