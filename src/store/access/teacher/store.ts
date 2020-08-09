import {configureStore, combineReducers} from "@reduxjs/toolkit";
import group from './group/groupSlice';
import category from './category/categorySlice';
import olympiad from './olympiad/olympiadSlice';
import discipline from './discipline/disciplineSlice';
import algorithm from './algorithm/algorithmSlice';
import homework from './homework/homeworkSlice';
import tasks from './tasks/tasksSlice';
import students from './students/studentsSlice';
import app from "../../common/app/appSlice";
import language from "../../common/language/languageSlice";
import game from "../../common/game/gameSplice";
import user from "../../common/user/userSlice";
import notification from "./notification/notificationSlice";

export type TeacherState = ReturnType<typeof teacherReducer>

export const teacherReducer = combineReducers({
    notification,
    group,
    olympiad,
    category,
    discipline,
    algorithm,
    homework,
    tasks,
    students,
    app,
    language,
    game,
    user,
});

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: teacherReducer,
});