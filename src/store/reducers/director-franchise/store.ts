import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {commonReducer} from "../common/commonReducer";

export type DirectorFranchiseState = ReturnType<typeof directorFranchiseReducer>

export const directorFranchiseReducer = combineReducers({
    ...commonReducer
});

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: directorFranchiseReducer,
});