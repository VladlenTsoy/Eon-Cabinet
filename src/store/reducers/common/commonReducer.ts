import appReducer from "./app/appSlice";
import gameReducer from "./game/gameSplice";
import {gameSettingReducer} from "./tasks/setting/reducer";
import {gameTotalsReducer} from "./tasks/totals/reducer";

export const commonReducer = {
    app: appReducer,
    game: gameReducer,
    gameSetting: gameSettingReducer,
    gameTotals: gameTotalsReducer,
};