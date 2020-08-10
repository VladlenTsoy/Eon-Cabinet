import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";

interface AgrProps {
}

export const fetchAlertNotice: any = createAsyncThunk<any, AgrProps>(
    'notification/alert/notice',
    async (_, {signal}) => {
        return await apiRequest('get', `/teacher/notification`, {signal});
    },
    {
        condition(_, {getState}: any): any {
            const {notification} = getState();

            if (notification.alertNotice.data?.title)
                return false
        }
    }
)