import {createSlice} from '@reduxjs/toolkit'
import {StoreState} from "store";
import {currentExtraReducers, CurrentProps, currentState} from "./current/current";
import {futureExtraReducers, FutureProps, futureState} from "./future/future";
import {pastExtraReducers, PastProps, pastState} from "./past/past";
import {detailExtraReducers, detailState, DetailProps} from "./detail/detail";

export interface StateProps {
    future: FutureProps;
    current: CurrentProps;
    past: PastProps;
    detail: DetailProps
}

const initialState: StateProps = {
    future: futureState,
    current: currentState,
    past: pastState,
    detail: detailState
};

const olympiadSlice = createSlice({
    name: 'olympiad',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        currentExtraReducers(builder)
        futureExtraReducers(builder)
        pastExtraReducers(builder)
        detailExtraReducers(builder)
    }
});

export const olympiadSelector = (state: StoreState) => state.olympiad;

export default olympiadSlice.reducer;
