import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../store";
import {statisticExtraReducers, statisticState, StatisticState} from "./statistic/statistic";
import {recentHomeworkExtraReducers, RecentHomeworkState, recentHomeworkState} from "./recent-homework/recentHomework";
import {homeworkExtraReducer, homeworkReducer, homeworkState, HomeworkState} from "./homework/homework";
import {detailsExtraReducers, detailsState, DetailsState} from "./details/details";
import {selectedExtraReducers, selectedReducers, selectedState, SelectedState} from "./selected/selected";
import {Student} from "../../../../lib/types/teacher/Student";

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
