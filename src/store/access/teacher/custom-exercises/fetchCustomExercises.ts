import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";
import {TeacherThunkProps} from "../store";

type ReturnedType = any

export const fetchCustomExercises = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'custom-exercises/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `/teacher/custom-exercises/form`, {signal});
    },
    {
        condition(_, {getState}) {
            const {customExercises} = getState()
            if (Object.keys(customExercises.exercises).length)
                return false
        }
    }
)