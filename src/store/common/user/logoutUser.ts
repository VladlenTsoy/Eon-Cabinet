import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api";
import {TeacherThunkProps} from "../../access/teacher/store";

interface ReturnedType {
    status: "success"
}

export const logoutUser = createAsyncThunk<ReturnedType, undefined, TeacherThunkProps>(
    'user/logout',
    async (_, {signal}) => {
        return await apiRequest('delete', `logout`, {signal});
    },
);