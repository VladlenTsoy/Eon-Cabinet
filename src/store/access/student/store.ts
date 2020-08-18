import {combineReducers, configureStore} from "@reduxjs/toolkit";
import app from "../../common/app/appSlice";
import language from "../../common/language/languageSlice";
import game from "../../common/game/gameSplice";
import user from "../../common/user/userSlice";
import {useDispatch} from "react-redux";

export type StudentState = ReturnType<typeof studentReducer>

export const studentReducer = combineReducers({
    // common
    app,
    language,
    game,
    user,
});

export type AppDispatch = typeof store.dispatch

export interface studentThunkProps {
    dispatch: AppDispatch
    state: StudentState
    extra?: unknown
    rejectValue?: unknown
}

export const useStudentDispatch = () => useDispatch<AppDispatch>()

export const store = configureStore({
    reducer: studentReducer,
});