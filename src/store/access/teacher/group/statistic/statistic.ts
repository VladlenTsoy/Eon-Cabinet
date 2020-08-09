import {fetchGroupsStatistic} from "./fetchGroupsStatistic";
import {PayloadAction} from "@reduxjs/toolkit";
import {StateProps} from "../groupSlice";

export interface StatisticState {
    loading: boolean
    data: { groups: number }
}

export const statisticState = {
    loading: true,
    data: {
        groups: 0
    }
}

export const statisticExtraReducers = {
    [fetchGroupsStatistic.pending]: (state: StateProps) => {
        state.statistic.loading = true;
    },
    [fetchGroupsStatistic.fulfilled]: (state: StateProps, action: PayloadAction<StatisticState['data']>) => {
        state.statistic.data = action.payload || [];
        state.statistic.loading = false;
    },
}