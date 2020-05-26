import {appReducer} from "./app/reducer";
// import {apiReducer} from "./api/reducer";
// import {userReducer} from "./user/reducer";
// import {languageReducer} from "./language/reducer";
import {gameReducer} from "./game/reducer";
import {gameSettingReducer} from "./tasks/setting/reducer";
import {gameTotalsReducer} from "./tasks/totals/reducer";

export const commonReducer = {
    app: appReducer,
    // api: apiReducer,
    // user: userReducer,
    // language: languageReducer,
    game: gameReducer,
    gameSetting: gameSettingReducer,
    gameTotals: gameTotalsReducer,
};