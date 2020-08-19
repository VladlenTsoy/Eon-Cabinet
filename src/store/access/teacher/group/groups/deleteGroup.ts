import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {message} from "../../../../../utils/message";
import {TeacherThunkProps} from "../../store";
import {Group} from "../../../../../lib/types/teacher/Group";

type ReturnedType = Group['id']
type AgrProps = Group['id']

export const deleteGroup = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/student/delete',
    async (groupId) => {
        //
        const response = await apiRequest('delete', `teacher/group/${groupId}`);
        response && message({type: 'success', content: 'Вы успешно удалили группу!'});
        return groupId;
    }
)