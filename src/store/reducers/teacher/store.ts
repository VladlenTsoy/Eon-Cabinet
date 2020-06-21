import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {commonReducer} from '../common/commonReducer';
import group from './group/groupSlice';
import category from './category/categorySlice';
import olympiad from './olympiad/olympiadSlice';
import discipline from './discipline/disciplineSlice';
import algorithm from './algorithm/algorithmSlice';
import homework from './homework/homeworkSlice';
import tasks from './tasks/tasksSlice';

export type TeacherState = ReturnType<typeof teacherReducer>

export const teacherReducer = combineReducers({
    group,
    olympiad,
    category,
    discipline,
    algorithm,
    homework,
    tasks,
    ...commonReducer
});

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: teacherReducer,
});