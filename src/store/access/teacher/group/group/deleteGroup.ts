import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";

export const deleteGroup: any = createAsyncThunk<string, any, any>(
    'teacher/group/delete',
    async (groupId) => {
        //
        const response = await apiRequest('delete', `teacher/group/${groupId}`);
        response && message({type: 'success', content: 'Вы успешно удалили группу!'});
        return groupId;
    }
)