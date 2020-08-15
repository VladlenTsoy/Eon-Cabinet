import {fetchStudentsStatistic} from "./fetchStudentsStatistic";
import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../studentSlice";

export interface StatisticState {
    loading: boolean;
    students: {
        count: number
        increase: number
        percent: number
    };
    homework: {
        count: number
        increase: number
        percent: number
    };
}

export const statisticState: StatisticState = {
    loading: true,
    students: {
        count: 0,
        increase: 0,
        percent: 0
    },
    homework: {
        count: 0,
        increase: 0,
        percent: 0
    }
}

export const statisticExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchStudentsStatistic.pending, (state) => {
        state.statistic.loading = true;
    })
    builder.addCase(fetchStudentsStatistic.fulfilled, (state, action) => {
        state.statistic.students = action.payload.students;
        state.statistic.homework = action.payload.homework;
        state.statistic.loading = false;
    })
}