import {fetchStudentsStatistic} from "./fetchStudentsStatistic";
import {PayloadAction} from "@reduxjs/toolkit";
import {StateProps} from "../studentsSlice";

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

export const statisticExtraReducers = {
    //
    [fetchStudentsStatistic.fulfilled]: (state:StateProps) => {
        state.statistic.loading = true;
    },
    // Вывод статистики для главной страницы
    [fetchStudentsStatistic.fulfilled]: (state: StateProps, action: PayloadAction<any>) => {
        state.statistic.students = action.payload.students;
        state.statistic.homework = action.payload.homework;
        state.statistic.loading = false;
    },
}