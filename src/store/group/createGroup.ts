import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";
import {AppThunkProps} from "store";
import {Group} from "../../lib/types/teacher/Group";

type ReturnedType = Group

interface AgrProps {
    title: Group['title']
    category_id: Group['category']
    method_id: Group['method_id']
}

export const createGroup = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    'teacher/group/create',
    async (data, {getState}) => {
        //
        const {discipline} = getState();
        if (!discipline.activeDisciplineId)
            return false

        data.method_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('post', `teacher/group`, {data, api2: true});
        response && message({type: 'success', content: 'Вы успешно создали группу!'});
        return response;
    }
)
