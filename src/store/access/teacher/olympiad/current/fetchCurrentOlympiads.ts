import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../../utils/api";

export const fetchCurrentOlympiads: any = createAsyncThunk<any, any>(
    'olympiad/fetch/current',
    async (_, {signal}) => {
        return await apiRequest('get', `olympiads/current`, {type: 'teacher', signal});
    },
    {
        condition(_, {getState}: any): any {
            const {olympiad} = getState();

            if (olympiad.current?.data?.length)
                return false;
        },
        dispatchConditionRejection: true
    }
)