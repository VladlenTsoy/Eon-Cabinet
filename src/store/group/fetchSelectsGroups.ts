import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {AppThunkProps} from "store";
import {Group} from "../../lib/types/teacher/Group";
import {Category} from "../../lib/types/common/Category";

interface ArgProps {
    groupId: Group['id']
    categoryId: Category['id']
}

type ReturnedType = { id: Group['id'], title: Group['title'] }[]

export const fetchSelectsGroups = createAsyncThunk<ReturnedType, ArgProps, AppThunkProps>(
    'teacher/groups/selects/fetch',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `teacher/groups/selects/${groupId}`, {signal});
    },
    {
        condition({categoryId}, {getState}) {
            const {group} = getState()
            if(!group.selects[categoryId]) return true
            if(group.selects[categoryId].force) return true
            if(group.selects[categoryId].data) return false
        }
    }
)
