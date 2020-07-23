import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {commonReducer} from '../common/commonReducer';

export const guestReducer = combineReducers({
    ...commonReducer
});

export const store = configureStore({
    reducer: guestReducer,
});