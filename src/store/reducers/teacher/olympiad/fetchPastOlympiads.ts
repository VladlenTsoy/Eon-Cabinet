import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

export const fetchPastOlympiads: any = createAsyncThunk<any, any>(
    'olympiad/fetch/past',
    async (pagination, {signal}) => {
        return await apiRequest('get', `olympiads/past`, {
            type: 'teacher', signal, params: {
                // results: pagination.pageSize,
                page: pagination.pageIndex,
            }
        });
    },
    {
        condition(_, {getState}: any): any {
            const {olympiad} = getState();

            if (olympiad.past?.data?.length)
                return false;
        }
    }
)