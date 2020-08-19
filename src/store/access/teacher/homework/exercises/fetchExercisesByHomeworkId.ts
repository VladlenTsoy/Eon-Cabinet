import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";
import {Homework} from "../../students/homework/homework";
import {TeacherThunkProps} from "../../store";
import {Exercise} from "../../../../../lib/types/teacher/Homework";

type ReturnedType = {homeworkId: number, exercises: Exercise[]}

interface ArgProps {
    homeworkId: Homework['id']
}

export const fetchExercisesByHomeworkId = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/homework/exercises/fetch',
    async ({homeworkId}, {signal}) => {
        const exercises = await apiRequest('get', `/teacher/tasks/homework/${homeworkId}/`, {signal})
        return {homeworkId, exercises: exercises}
    },
    {
        condition({homeworkId}, {getState}) {
            const {homework} = getState()

            if (!homeworkId)
                return false

            if (homework.exercises.data && homework.exercises.data[homeworkId]?.length)
                return false
        }
    }
)