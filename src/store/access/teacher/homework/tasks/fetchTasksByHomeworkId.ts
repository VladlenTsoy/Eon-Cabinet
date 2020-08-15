import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {Homework} from "../../students/homework/homework";
import {TeacherThunkProps} from "../../store";

type ReturnedType = {homeworkId: number, tasks: any[]}

interface ArgProps {
    homeworkId: Homework['id']
}

export const fetchTasksByHomeworkId = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'homework/tasks/fetch',
    async ({homeworkId}, {signal}) => {
        const tasks = await apiRequest('get', `/teacher/tasks/homework/${homeworkId}/`, {signal});
        return {homeworkId, tasks: tasks};
    },
    // {
    //     condition({categoryId, activeDisciplineId}, {getState}) {
    //         const {homework} = getState();
    //
    //         if (!categoryId || !activeDisciplineId)
    //             return false;
    //
    //         if (homework.categories.length && homework.categories[categoryId]?.length)
    //             return false;
    //     }
    // }
)