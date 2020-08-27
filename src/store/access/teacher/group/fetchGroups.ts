import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {TeacherThunkProps} from "../store";
import {Group} from "../../../../lib/types/teacher/Group";

interface ArgProps {
    page?: number
    categoryId: number
}

type ReturnedType = {
    total: number
    data: Group[]
    last_page: number
    current_page: number
    per_page: number
}

export const fetchGroups = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/groups/fetch',
    async ({page = 1, categoryId}, {signal}) => {
        return await apiRequest('get', `teacher/groups/${categoryId}`, {signal, params: {page}});
    },
    {
        condition({page = 1, categoryId}, {getState}) {
            const {group} = getState();
            if(!group.categories[categoryId]) return true
            const {current_page = 0, last_page = 0} = group.categories[categoryId]
            if (!current_page) return true
            if (current_page >= page || current_page >= last_page) return false
        }
    }
)