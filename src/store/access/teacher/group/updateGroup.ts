import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";
import {TeacherThunkProps} from "../store";
import {Group} from "../../../../lib/types/teacher/Group";

type ReturnedType = Group

interface AgrProps {
    groupId: Group['id']
    data: {
        title: Group['title']
        category_id: Group['category']
        // method_id: Group['method_id']
    }
}

export const updateGroup = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/group/update',
    async ({groupId, data}) => {
        //
        const response = await apiRequest('patch', `teacher/group/${groupId}`, {data, api2: true});
        response && message({type: 'success', content: 'Вы успешно изменили группу!'});
        return response;
    }
)