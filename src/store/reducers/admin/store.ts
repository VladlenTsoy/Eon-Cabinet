import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {commonReducer} from "../common/commonReducer";

export type AdminState = ReturnType<typeof adminReducer>

export const adminReducer = combineReducers({
    ...commonReducer
});

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: adminReducer,
});