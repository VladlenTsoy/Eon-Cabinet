import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {commonReducer, CommonState} from '../../common/commonReducer';
import group from './group/groupSlice';
import category from './category/categorySlice';
import olympiad from './olympiad/olympiadSlice';
import discipline from './discipline/disciplineSlice';
import algorithm from './algorithm/algorithmSlice';
import homework from './homework/homeworkSlice';
import tasks from './tasks/tasksSlice';
import students from './students/studentsSlice';

export type TeacherState = ReturnType<typeof teacherReducer> & CommonState

export const teacherReducer = combineReducers({
    group,
    olympiad,
    category,
    discipline,
    algorithm,
    homework,
    tasks,
    students,
    ...commonReducer
});

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: teacherReducer,
});