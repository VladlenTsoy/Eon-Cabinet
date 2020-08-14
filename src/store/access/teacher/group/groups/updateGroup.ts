import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {TeacherThunkProps} from "../../store";
import {GroupProps} from "../groupSlice";

type ReturnedType = GroupProps

interface AgrProps {
    groupId: GroupProps['id']
    data: {
        title: GroupProps['title']
        category_id: GroupProps['category']
        method_id: GroupProps['method_id']
    }
}

export const updateGroup = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/group/update',
    async ({groupId, data}) => {
        //
        const response = await apiRequest('patch', `teacher/group/${groupId}`, {data});
        response && message({type: 'success', content: 'Вы успешно изменили группу!'});
        return response;
    }
)