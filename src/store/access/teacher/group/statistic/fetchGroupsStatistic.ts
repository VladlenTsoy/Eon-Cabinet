import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";

type ReturnedType = {
    groups: number
}

export const fetchGroupsStatistic = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'group/fetch/statistics/groups',
    async (_, {signal}) => {
        return await apiRequest('get', `groups/statistic`, {signal, type: "teacher"});
    },
    {
        condition(_, {getState}) {
            const {group} = getState()
            if (group.statistic.data.groups)
                return false;
        },
    }
)