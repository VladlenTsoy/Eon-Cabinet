import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "../../utils/api"
import {Homework} from "../../lib/types/teacher/Homework"
import {AppThunkProps} from "store"

interface AgrProps {
    page?: number
    categoryId: number
}

type ReturnedType = {
    total: number
    results: Homework[]
    last_page: number
    current_page: number
    per_page: number
}

export const fetchHomeworkByCategoryId = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "teacher/homework/category/fetch",
    async ({categoryId, page = 1}, {signal}) => {
        return await apiRequest("get", `teacher/homework/category/${categoryId}`, {signal, params: {page}, api2: true})
    },
    {
        condition({categoryId, page = 1}, {getState}: any): any {
            const {homework} = getState()
            if (!homework.categories[categoryId]) return true
            const {current_page = 0, last_page = 0} = homework.categories[categoryId]
            if (!current_page) return true
            if (current_page >= page || current_page >= last_page) return false
        }
    }
)
