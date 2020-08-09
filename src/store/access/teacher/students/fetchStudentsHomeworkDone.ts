import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../../utils/api";

interface AgrProps {
    force?: boolean;
}

export const fetchStudentsHomeworkDone: any = createAsyncThunk<any, AgrProps>(
    'students/homework/done',
    async (_, {signal}) => {
        return await apiRequest('get', `students/homework/done`, {signal, type: "teacher"});
    },
)