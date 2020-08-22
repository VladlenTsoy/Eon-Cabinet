import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {TeacherThunkProps} from "../store";
import {Group} from "../../../../lib/types/teacher/Group";

type ReturnedType = {
    total: number
    data: Group[]
    last_page: number
    current_page: number
}

export const fetchGroups = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'teacher/groups/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', 'groups', {type: 'teacher', signal});
    },
    {
        condition(_, {getState}) {
            const {group} = getState();
            if (group.ids.length !== 0 && group.ids.length >= group.total) return false;
        }
    }
)