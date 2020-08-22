import {Group} from "../../../../lib/types/teacher/Group";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../store";
import {apiRequest} from "../../../../utils/api";

interface ArgProps {
    id: Group['id']
}

type ReturnedType = {
    total: number
    data: Group[]
}

export const fetchGroup = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/group/fetch',
    async ({id}, {signal}) => {
        return await apiRequest('get', `teacher/group/${id}`, {signal});
    },
    {
        condition({id}, {getState}) {
            const {group} = getState();
            if (group.ids.includes(id)) return false;
        }
    }
)