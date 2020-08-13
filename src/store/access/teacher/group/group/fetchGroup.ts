import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
    groupId: number;
}

export const fetchGroup: any = createAsyncThunk<any, AgrProps>(
    'group/fetch/group',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `teacher/group/${groupId}`, {signal});
    },
    {
        condition({groupId}, {getState, extra}: any): any {
            const {group} = getState();

            if (group.groups.length) {
                const checkGroup = group.groups.find((group: any) => group.id === Number(groupId));
                extra = checkGroup;
                if (checkGroup) return false;
            }
        },
        dispatchConditionRejection: true
    }
)