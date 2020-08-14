import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {GroupProps} from "../groupSlice";
import {TeacherThunkProps} from "../../store";

type ReturnedType = GroupProps[]

export const fetchGroups = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'group/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', 'groups', {type: 'teacher', signal});
    },
    {
        condition(_, {getState}) {
            const {group} = getState();
            if (group.groups.data.length) return false;
        }
    }
)