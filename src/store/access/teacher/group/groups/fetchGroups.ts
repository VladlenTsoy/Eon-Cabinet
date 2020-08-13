import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
}

export const fetchGroups: any = createAsyncThunk<any, AgrProps>(
    'group/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', 'groups', {type: 'teacher', signal});
    },
    {
        condition(_, {getState}: any): any {
            const {group} = getState();
            if (group.groups.data.length) return false;
        }
    }
)