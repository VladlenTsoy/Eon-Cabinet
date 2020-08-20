import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {TeacherThunkProps} from "../../store";
import {AlertNotice} from "../../../../../lib/types/teacher/Notification";

type ReturnedType =  AlertNotice

export const fetchAlertNotice = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'notification/alert/notice',
    async (_, {signal}) => {
        return await apiRequest('get', `/teacher/notification`, {signal});
    },
    {
        condition(_, {getState}) {
            const {notification} = getState();

            if (notification.alertNotice.data?.title)
                return false
        }
    }
)