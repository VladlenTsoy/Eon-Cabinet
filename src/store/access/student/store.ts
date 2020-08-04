import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {commonReducer, CommonState} from "../../common/commonReducer";

export type StudentState = ReturnType<typeof studentReducer> & CommonState

export const studentReducer = combineReducers({
    ...commonReducer
});

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: studentReducer,
});