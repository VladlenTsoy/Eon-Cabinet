import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {QuickNoticeProps} from "./quickNotice";
import {TeacherThunkProps} from "../../store";

type ReturnedType = QuickNoticeProps

export const fetchQuickNotice = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'notification/quick/notice',
    async (_, {signal}) => {
        return await apiRequest('get', `/teacher/quick-notice`, {signal});
    },
    {
        condition(_, {getState}) {
            const {notification} = getState();

            if (notification.quickNotice.data?.title)
                return false
        }
    }
)