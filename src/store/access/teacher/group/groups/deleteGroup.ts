import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {GroupProps} from "../groupSlice";
import {TeacherThunkProps} from "../../store";

type ReturnedType = GroupProps['id']
type AgrProps = GroupProps['id']

export const deleteGroup = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/student/delete',
    async (groupId) => {
        //
        const response = await apiRequest('delete', `teacher/group/${groupId}`);
        response && message({type: 'success', content: 'Вы успешно удалили группу!'});
        return groupId;
    }
)