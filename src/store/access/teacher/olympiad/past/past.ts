import {Olympiad} from "../../../../../lib/types/teacher/Olympiad";
import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../olympiadSlice";
import {fetchPastOlympiads} from "./fetchPastOlympiads";

export interface PastProps {
    data: Olympiad[],
    pageIndex: number;
    total: number;
    loading: boolean;
}

export const pastState = {
    loading: true,
    data: [],
    pageIndex: 1,
    total: 0,
}

export const pastExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchPastOlympiads.pending, (state) => {
        state.current.loading = true;
    })
    builder.addCase(fetchPastOlympiads.fulfilled, (state, action) => {
        state.past.data = action.payload.data;
        state.past.pageIndex = action.payload.current_page;
        state.past.total = action.payload.total;
        state.past.loading = false;
    })
    builder.addCase(fetchPastOlympiads.rejected, (state) => {
        state.current.loading = false;
    })
}