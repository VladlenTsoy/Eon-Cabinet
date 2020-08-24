import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {TeacherThunkProps} from "../store";
import {Group} from "../../../../lib/types/teacher/Group";

interface ArgProps {
    page?: number
    categoryId: number | string
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
    async ({page= 1, categoryId}, {signal}) => {
        return await apiRequest('get', `teacher/groups/${categoryId}`, {signal});
    },
    {
        condition({page= 1}, {getState}) {
            const {group} = getState();
            if(group.current_page === 0) return true

            // 0 15 0
            // 30 30 43
            //   (4 * 15)
            // 30  45  43
            // group.total > page * group.page_size

            // if (
            //     group.ids.length !== 0
                // &&
                // (
                //     group.ids.length >= (group.page_size * page) &&
                //     group.ids.length > group.total
                // )
            // ) return false
        }
    }
)