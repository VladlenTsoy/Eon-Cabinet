import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {apiReducer} from "./reducers/common/api/reducer";
import {userReducer} from "./reducers/common/user/reducer";
import {languageReducer} from "./reducers/common/language/reducer";
import {appReducer} from "./reducers/common/app/reducer";
import {gameReducer} from "./reducers/common/game/reducer";
import {gameSettingReducer} from "./tasks/setting/reducer";
import {gameTotalsReducer} from "./tasks/totals/reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    api: apiReducer,
    user: userReducer,
    language: languageReducer,
    game: gameReducer,
    gameSetting: gameSettingReducer,
    gameTotals: gameTotalsReducer,
});

export const store = configureStore({reducer: rootReducer});