import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api.old";

interface AgrProps {
    categoryId: number;
    activeDisciplineId: string;
}

export const fetchHomeworkByCategoryId: any = createAsyncThunk<any, AgrProps>(
    'homework/fetch',
    async ({categoryId}, {signal}) => {
        const homework = await apiRequest('get', `homework/${categoryId}`, {type: 'teacher', signal});
        return {categoryId, homework: homework};
    },
    {
        condition({categoryId, activeDisciplineId}, {getState}: any): any {
            const {homework} = getState();

            if (!categoryId || !activeDisciplineId)
                return false;

            if (homework.categories.length && homework.categories[categoryId]?.length)
                return false;
        }
    }
)