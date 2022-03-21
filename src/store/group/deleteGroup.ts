import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";
import {AppThunkProps} from "store";
import {Group} from "../../lib/types/teacher/Group";

type ReturnedType = Group['id']
type AgrProps = Group['id']

export const deleteGroup = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    'teacher/student/delete',
    async (groupId) => {
        //
        const response = await apiRequest('delete', `teacher/group/${groupId}`, {api2: true});
        response && message({type: 'success', content: 'Вы успешно удалили группу!'});
        return groupId;
    }
)
