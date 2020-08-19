import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {message} from "../../../../utils/message";
import {Homework} from "../../../../lib/types/teacher/Homework";

type Args = {categoryId: Homework["category_id"], homeworkId: Homework["id"]};

export const deleteHomework: any = createAsyncThunk<any, Args, any>(
    'teacher/homework/delete',
    async ({categoryId,homeworkId}) => {
        //
        const response = await apiRequest('delete', `teacher/homework/${homeworkId}`);
        response && message({type: 'success', content: 'Вы успешно удалили домашнее задание!'});
        return {categoryId,homeworkId};
    }
)