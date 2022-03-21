import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"
import app from "../../common/app/appSlice";
import language from "../../common/language/languageSlice";
import game from "../../common/game/gameSplice";
import user from "../../common/user/userSlice";

export const guestReducer = combineReducers({
    // common
    app,
    language,
    game,
    user,
});

export const store = configureStore({
    reducer: guestReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware({immutableCheck: false}))
});
