import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";
import {Homework} from "../../lib/types/teacher/Homework";
import {AppThunkProps} from "store";

interface Args {
    categoryId: Homework["category_id"],
    homeworkId: Homework["id"]
}

type ReturnedType = Args

export const deleteHomework = createAsyncThunk<ReturnedType, Args, AppThunkProps>(
    'teacher/homework/delete',
    async ({categoryId, homeworkId}) => {
        //
        const response = await apiRequest('delete', `teacher/homework/${homeworkId}`);
        response && message({type: 'success', content: 'Вы успешно удалили домашнее задание!'});
        return {categoryId, homeworkId};
    }
)
