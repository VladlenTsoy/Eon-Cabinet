import {configureStore, combineReducers} from "@reduxjs/toolkit";
import group from './group/groupSlice';
import {appReducer} from "../common/app/reducer";
import {apiReducer} from "../common/api/reducer";
import {userReducer} from "../common/user/reducer";
import {languageReducer} from "../common/language/reducer";
import {gameReducer} from "../common/game/reducer";
import {gameSettingReducer} from "../../tasks/setting/reducer";
import {gameTotalsReducer} from "../../tasks/totals/reducer";

export type TeacherState = ReturnType<typeof teacherReducer>

export const teacherReducer = combineReducers({
    app: appReducer,
    api: apiReducer,
    user: userReducer,
    language: languageReducer,
    game: gameReducer,
    gameSetting: gameSettingReducer,
    gameTotals: gameTotalsReducer,

    group,
});

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: teacherReducer,
});