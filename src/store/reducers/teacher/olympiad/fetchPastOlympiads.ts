import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

export const fetchPastOlympiads: any = createAsyncThunk<any, any>(
    'olympiad/fetch/past',
    async (_, {signal}) => {
        return await apiRequest('get', `olympiads/past`, {type: 'teacher', signal});
    },
    {
        condition(_, {getState}: any): any {
            const {olympiad} = getState();

            if (olympiad.past?.data?.length)
                return false;
        }
    }
)