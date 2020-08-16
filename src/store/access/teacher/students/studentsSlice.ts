import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../store";
import {statisticExtraReducers, statisticState, StatisticState} from "./statistic/statistic";
import {recentHomeworkExtraReducers, RecentHomeworkState, recentHomeworkState} from "./recent-homework/recentHomework";
import {homeworkExtraReducer, homeworkReducer, homeworkState, HomeworkState} from "./homework/homework";
import {detailsExtraReducers, detailsState, DetailsState} from "./details/details";
import {selectedExtraReducers, selectedReducers, selectedState, SelectedState} from "./selected/selected";

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
    coins: number;
}

export interface StateProps {
    homework: HomeworkState
    details: DetailsState
    selectedIds: Student['id'][]
    recentHomework: RecentHomeworkState
    statistic: StatisticState
    selected: SelectedState
}

const initialState: StateProps = {
    homework: homeworkState,
    details: detailsState,
    selectedIds: [],
    recentHomework: recentHomeworkState,
    statistic: statisticState,
    selected: selectedState,
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        resetStudentSlice: () => initialState,
        changeSelectedIds(state: StateProps, action: PayloadAction<StateProps['selectedIds']>) {
            state.selectedIds = action.payload;
        },
        ...selectedReducers,
        ...homeworkReducer
    },
    extraReducers: (builder) => {
        detailsExtraReducers(builder)
        homeworkExtraReducer(builder)
        recentHomeworkExtraReducers(builder)
        statisticExtraReducers(builder)
        selectedExtraReducers(builder)
    }
})

export const studentsSelector = (state: TeacherState) => state.students;

type KeyProps = 'homework' | 'details' | 'selectedIds' | 'recentHomework' | 'statistic' | 'selected'

export const studentsSubSelector: any = (key: KeyProps) => (state: TeacherState) => state.students[key];

export const {changeSelectedIds, nextWeek, prevWeek, resetStudentSlice} = studentsSlice.actions;

export default studentsSlice.reducer;
