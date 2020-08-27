import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {Homework} from "../students/homework/homework";
import {TeacherThunkProps} from "../store";
import {Exercise} from "../../../../lib/types/teacher/Homework";

type ReturnedType = Exercise[]

interface ArgProps {
    homeworkId: Homework['id']
}

export const fetchExercisesByHomeworkId = createAsyncThunk<ReturnedType, ArgProps, TeacherThunkProps>(
    'teacher/homework-exercises/fetch',
    async ({homeworkId}, {signal}) => {
        return await apiRequest('get', `/teacher/tasks/homework/${homeworkId}/`, {signal})
    },
    {
        condition({homeworkId}, {getState}) {
            const {homeworkExercises} = getState()
            const exercises = Object.values(homeworkExercises.entities).filter(exercise => exercise && exercise.homework_id === homeworkId)
            if (exercises.length) return false
        }
    }
)