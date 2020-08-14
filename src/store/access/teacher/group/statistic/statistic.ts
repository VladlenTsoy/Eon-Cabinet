import {fetchGroupsStatistic} from "./fetchGroupsStatistic";
import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
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

export const statisticExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchGroupsStatistic.pending, (state) => {
        state.statistic.loading = true
    })
    builder.addCase(fetchGroupsStatistic.fulfilled, (state, action) => {
        state.statistic.data = action.payload;
        state.statistic.loading = false;
    })
}