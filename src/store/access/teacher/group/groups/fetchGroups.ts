import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {TeacherThunkProps} from "../../store";
import {Group} from "../../../../../lib/types/teacher/Group";

type ReturnedType = Group[]

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