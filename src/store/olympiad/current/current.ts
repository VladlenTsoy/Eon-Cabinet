import {Olympiad} from "../../../lib/types/teacher/Olympiad";
import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../olympiadSlice";
import {fetchCurrentOlympiads} from "./fetchCurrentOlympiads";

export interface CurrentProps {
    data: Olympiad[],
    pageIndex: number;
    total: number;
    loading: boolean;
}

export const currentState: CurrentProps = {
    loading: true,
    data: [],
    pageIndex: 1,
    total: 0,
}

export const currentExtraReducers = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchCurrentOlympiads.pending, (state) => {
        state.current.loading = true;
    })
    builder.addCase(fetchCurrentOlympiads.fulfilled, (state, action) => {
        state.current.data = action.payload;
        state.current.loading = false;
    })
    builder.addCase(fetchCurrentOlympiads.rejected, (state) => {
        state.current.loading = false;
    })
}
