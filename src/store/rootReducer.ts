import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {apiReducer} from "./api/reducer";
import {userReducer} from "./user/reducer";
import {languageReducer} from "./language/reducer";
import {appReducer} from "./app/reducer";
import {gameReducer} from "./game/reducer";

const rootReducer = combineReducers({
    app: appReducer,
    api: apiReducer,
    user: userReducer,
    language: languageReducer,
    game: gameReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));