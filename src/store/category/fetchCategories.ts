import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {AppThunkProps} from "store";
import {Category} from "../../lib/types/common/Category";

type ReturnedType = Category[]

export const fetchCategories = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    'category/fetch',
    async () => {
        return apiRequest('get', 'categories', {type: "teacher", api2: true})
    }
)