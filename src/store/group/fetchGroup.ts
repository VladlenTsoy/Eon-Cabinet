import {Group} from "../../lib/types/teacher/Group";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppThunkProps} from "store";
import {apiRequest} from "../../utils/api";

interface ArgProps {
    id: Group['id']
}

type ReturnedType = Group

export const fetchGroup = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    'teacher/group/fetch',
    async ({id}, {signal}) => {
        return await apiRequest('get', `teacher/group/${id}`, {signal, api2: true});
    },
    {
        condition({id}, {getState}) {
            const {group} = getState();
            if (group.ids.includes(id)) return false;
        }
    }
)
