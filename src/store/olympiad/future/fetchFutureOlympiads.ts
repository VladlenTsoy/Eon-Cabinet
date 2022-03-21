import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api";

export const fetchFutureOlympiads: any = createAsyncThunk<any, any>(
    'olympiad/fetch/future',
    async (_, {signal}) => {
        return await apiRequest('get', `olympiads/future`, {type: 'teacher', signal});
    },
    {
        condition(_, {getState}: any): any {
            const {olympiad} = getState();

            if (olympiad.future?.data?.length)
                return false;
        },
        dispatchConditionRejection: true
    }
)
