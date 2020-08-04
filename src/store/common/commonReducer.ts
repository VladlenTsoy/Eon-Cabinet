import {combineReducers, configureStore} from "@reduxjs/toolkit";
import app from "./app/appSlice";
import language from "./language/languageSlice";
import game from "./game/gameSplice";
import user from "./user/userSlice";

export type CommonState = ReturnType<typeof commonReducer>

export const commonReducer = combineReducers({
    app,
    language,
    game,
    user,
});