import {Olympiad} from "../../../../../lib/types/teacher/Olympiad";
import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../olympiadSlice";
import {fetchFutureOlympiads} from "./fetchFutureOlympiads";

export interface FutureProps {
    data: Olympiad[],
    pageIndex: number;
    total: number;
    loading: boolean;
}

export const futureState: FutureProps = {
    loading: true,
    data: [],
    pageIndex: 1,
    total: 0,
}

export const futureExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchFutureOlympiads.pending, (state) => {
        state.future.loading = true;
    })
    builder.addCase(fetchFutureOlympiads.fulfilled, (state, action) => {
        state.future.data = action.payload.data;
        state.future.pageIndex = action.payload.current_page;
        state.future.total = action.payload.total;
        state.future.loading = false;
    })
    builder.addCase(fetchFutureOlympiads.rejected, (state) => {
        state.future.loading = false;
    })
}