import {Homework} from "../../../../lib/types/teacher/Homework";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherThunkProps} from "../store";
import {apiRequest} from "../../../../utils/api";
import {Category} from "../../../../lib/types/common/Category";
import {Group} from "../../../../lib/types/teacher/Group";

interface AgrProps {
    groupId: Group['id']
    categoryId: Category['id']
}

type ReturnedType = Homework[]

export const fetchSelectsHomework = createAsyncThunk<ReturnedType, AgrProps, TeacherThunkProps>(
    'teacher/homework/selects/fetch',
    async ({groupId}, {signal}) => {
        return await apiRequest('get', `teacher/homework/group/${groupId}`, {signal});
    },
    {
        condition({categoryId}, {getState}: any): any {
            const {homework} = getState();
            if(!homework.selects[categoryId]) return true
            if(homework.selects[categoryId].force) return true
            if(homework.selects[categoryId].data) return false
        }
    }
)