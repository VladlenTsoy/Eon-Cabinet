import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {apiReducer} from "./api/reducer";
import {userReducer} from "./user/reducer";
import {languageReducer} from "./language/reducer";
import {appReducer} from "./app/reducer";
import {gameReducer} from "./game/reducer";
import {gameSettingReducer} from "./tasks/setting/reducer";
import {gameTotalsReducer} from "./tasks/totals/reducer";

const rootReducer = combineReducers({
    app: appReducer,
    api: apiReducer,
    user: userReducer,
    language: languageReducer,
    game: gameReducer,
    gameSetting: gameSettingReducer,
    gameTotals: gameTotalsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));