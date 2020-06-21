import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

interface AgrProps {
    activeDisciplineId: string;
}

export const fetchFutureOlympiads: any = createAsyncThunk<any, AgrProps>(
    'olympiad/fetch',
    async (_, {signal}) => {
        return await apiRequest('get', `olympiads/future`, {type: 'teacher', signal});
    },
    {
        condition({activeDisciplineId}, {getState}: any): any {
            const {olympiad} = getState();

            if (!activeDisciplineId)
                return false;

            if (olympiad.futures.length)
                return false;
        }
    }
)