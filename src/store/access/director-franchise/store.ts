import {combineReducers, configureStore} from "@reduxjs/toolkit";
import app from "../../common/app/appSlice";
import language from "../../common/language/languageSlice";
import game from "../../common/game/gameSplice";
import user from "../../common/user/userSlice";
import {useDispatch} from "react-redux";

export type DirectorFranchiseState = ReturnType<typeof directorFranchiseReducer>

export const directorFranchiseReducer = combineReducers({
    // common
    app,
    language,
    game,
    user,
});

export type AppDispatch = typeof store.dispatch

export interface AdminThunkProps {
    dispatch: AppDispatch
    state: DirectorFranchiseState
    extra?: unknown
    rejectValue?: unknown
}

export const useDirectorFranchiseDispatch = () => useDispatch<AppDispatch>()

export const store = configureStore({
    reducer: directorFranchiseReducer,
});