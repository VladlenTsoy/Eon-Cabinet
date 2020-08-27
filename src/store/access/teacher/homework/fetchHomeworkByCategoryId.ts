import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {Homework} from "../../../../lib/types/teacher/Homework";
import {TeacherThunkProps} from "../store";

interface AgrProps {
    page?: number
    categoryId: number
}

// type ReturnedType = {
//     total: number
//     data: Homework[]
//     last_page: number
//     current_page: number
//     per_page: number
// }

type ReturnedType = Homework[]

export const fetchHomeworkByCategoryId = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/homework/fetch',
    async ({categoryId,page =1}, {signal}) => {
        return await apiRequest('get', `homework/${categoryId}`, {type: 'teacher', signal});
    },
    {
        condition({categoryId, page =1}, {getState}: any): any {
            const {homework} = getState();
            if(!homework.categories[categoryId]) return true
            const {current_page = 0, last_page = 0} = homework.categories[categoryId]
            if (!current_page) return true
            if (current_page >= page || current_page >= last_page) return false
        }
    }
)