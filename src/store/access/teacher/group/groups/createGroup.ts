import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {GroupProps} from "../groupSlice";
import {TeacherThunkProps} from "../../store";

type ReturnedType = GroupProps

interface AgrProps {
    title: GroupProps['title']
    category_id: GroupProps['category']
    method_id: GroupProps['method_id']
}

export const createGroup = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/group/create',
    async (data, {getState}) => {
        //
        const {discipline} = getState();
        if (!discipline.activeDisciplineId)
            return false

        data.method_id = discipline.activeDisciplineId;
        //
        const response = await apiRequest('post', `teacher/group`, {data});
        response && message({type: 'success', content: 'Вы успешно создали группу!'});
        return response;
    }
)