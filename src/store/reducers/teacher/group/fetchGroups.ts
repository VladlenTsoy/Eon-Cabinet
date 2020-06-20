import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

interface AgrProps {
    activeDisciplineId: any;
}

export const fetchGroups: any = createAsyncThunk<any, AgrProps>(
    'group/fetch',
    async ({activeDisciplineId}, {signal}) => {
        return await apiRequest('get', 'groups', {type: 'teacher', signal});
    },
    {
        condition({activeDisciplineId}, {getState}: any): any {
            const {group} = getState();
            if (!activeDisciplineId)
                return false;

            const checkDiscipline = group.groups.find((group: any) => group.method_id === Number(activeDisciplineId));
            if (group.groups.length && checkDiscipline)
                return false;
        }
    }
)