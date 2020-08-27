import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../store";
import {apiRequest} from "../../../../utils/api";

type ReturnedType = number

export const fetchStatisticsGroups = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'teacher/statistics/groups/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `groups/statistics`, {type: 'teacher', signal});
    },
    {
        condition(_, {getState}) {
            const {group} = getState();
            if (group.statistics.count > 0) return false
        }
    }
)