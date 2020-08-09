import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

interface AgrProps {
}

export const fetchGroupsStatistic: any = createAsyncThunk<any, AgrProps>(
    'group/fetch/statistics/groups',
    async (_, {signal}) => {
        return await apiRequest('get', `groups/statistic`, {signal, type: "teacher"});
    },
    {
        condition(_, {getState}: any): any {
            const {group} = getState()
            if (group.statistic.data.groups)
                return false;
        },
    }
)