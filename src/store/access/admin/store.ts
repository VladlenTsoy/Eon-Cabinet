import {combineReducers, configureStore} from "@reduxjs/toolkit";
import app from "../../common/app/appSlice";
import language from "../../common/language/languageSlice";
import game from "../../common/game/gameSplice";
import user from "../../common/user/userSlice";
import {useDispatch} from "react-redux";

export type AdminState = ReturnType<typeof adminReducer>

export const adminReducer = combineReducers({
    // common
    app,
    language,
    game,
    user,
});

export type AppDispatch = typeof store.dispatch

export interface AdminThunkProps {
    dispatch: AppDispatch
    state: AdminState
    extra?: unknown
    rejectValue?: unknown
}

export const useAdminDispatch = () => useDispatch<AppDispatch>()

export const store = configureStore({
    reducer: adminReducer,
});