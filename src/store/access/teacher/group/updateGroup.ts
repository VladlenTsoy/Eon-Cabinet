import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api.old";
import {message} from "../../../../utils/message";

interface ParamsProps {
    groupId: string | number;
    data: object
}

export const updateGroup: any = createAsyncThunk<any, ParamsProps, any>(
    'teacher/group/update',
    async ({groupId, data}) => {
        //
        const response = await apiRequest('patch', `teacher/group/${groupId}`, {data});
        response && message({type: 'success', content: 'Вы успешно изменили группу!'});
        return response;
    }
)