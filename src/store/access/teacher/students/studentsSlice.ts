import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../store";
import {statisticExtraReducers, statisticState, StatisticState} from "./statistic/statistic";
import {recentHomeworkExtraReducers, RecentHomeworkState, recentHomeworkState} from "./recent-homework/recentHomework";
import {homeworkExtraReducer, homeworkReducer, homeworkState, HomeworkState} from "./homework/homework";
import {detailsExtraReducers, detailsState, DetailsState} from "./details/details";

export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string | null;
    login: string | null;
    date_of_birth: string | object | null;
    group_id: number;
    image: string;
    is_blocked: boolean;
    day_block: number | null;
    day_unblock: number | null;
}

export interface StateProps {
    homework: HomeworkState
    details: DetailsState
    selectedIds: Student['id'][]
    recentHomework: RecentHomeworkState
    statistic: StatisticState
}

const initialState: StateProps = {
    homework: homeworkState,
    details: detailsState,
    selectedIds: [],
    recentHomework: recentHomeworkState,
    statistic: statisticState
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        changeSelectedIds(state: StateProps, action: PayloadAction<StateProps['selectedIds']>) {
            state.selectedIds = action.payload;
        },
        ...homeworkReducer
    },
    extraReducers: {
        ...detailsExtraReducers,
        ...homeworkExtraReducer,
        ...recentHomeworkExtraReducers,
        ...statisticExtraReducers
    }
})

export const studentsSelector = (state: TeacherState) => state.students;

export const {changeSelectedIds} = studentsSlice.actions;

export default studentsSlice.reducer;
