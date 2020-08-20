import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {TeacherThunkProps} from "../../store";
import {QuickNotice} from "../../../../../lib/types/teacher/Notification";

type ReturnedType = QuickNotice

export const fetchQuickNotice = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'teacher/notification/quick/notice',
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