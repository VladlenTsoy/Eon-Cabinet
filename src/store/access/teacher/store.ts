import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {useDispatch} from 'react-redux'
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
import customExercises from "./custom-exercises/customExercisesSlice";
import homeworkExercises from "./homework-exercises/homeworkExercisesSlice";
import contacts from "lib/modules/chat/reducer/contacts/contactsSlice";
import messages from "lib/modules/chat/reducer/messages/messagesSlice";

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
    customExercises,
    homeworkExercises,
    // common
    app,
    language,
    game,
    user,
    contacts,
    messages,
});

export type AppDispatch = typeof store.dispatch

export interface TeacherThunkProps {
    dispatch: AppDispatch
    state: TeacherState
    extra?: unknown
    rejectValue?: unknown
}

export const useTeacherDispatch = () => useDispatch<AppDispatch>()

export const store = configureStore({
    reducer: teacherReducer,
});