import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {commonReducer} from '../common/commonReducer';
import group from './group/groupSlice';
import olympiad from './olympiad/olympiadSlice';

export type TeacherState = ReturnType<typeof teacherReducer>

export const teacherReducer = combineReducers({
    group,
    olympiad,
    ...commonReducer
});

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: teacherReducer,
});