import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api.old";
import {message} from "../../../../utils/message";
import {HomeworkProps} from "./homeworkSlice";

type Args = {categoryId: HomeworkProps["category_id"], homeworkId: HomeworkProps["id"]};

export const deleteHomework: any = createAsyncThunk<any, Args, any>(
    'teacher/group/delete',
    async ({categoryId,homeworkId}) => {
        //
        const response = await apiRequest('delete', `teacher/homework/${homeworkId}`);
        response && message({type: 'success', content: 'Вы успешно удалили домашнее задание!'});
        return {categoryId,homeworkId};
    }
)