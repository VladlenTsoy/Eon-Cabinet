import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";

interface AgrProps {
}

export const fetchQuickNotice: any = createAsyncThunk<any, AgrProps>(
    'notification/quick/notice',
    async (_, {signal}) => {
        return await apiRequest('get', `/teacher/quick-notice`, {signal});
    },
    {
        condition(_, {getState}: any): any {
            const {notification} = getState();

            if (notification.quickNotice.data?.title)
                return false
        }
    }
)