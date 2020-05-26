import {appReducer} from "./app/reducer";
import {gameReducer} from "./game/reducer";
import {gameSettingReducer} from "./tasks/setting/reducer";
import {gameTotalsReducer} from "./tasks/totals/reducer";

export const commonReducer = {
    app: appReducer,
    game: gameReducer,
    gameSetting: gameSettingReducer,
    gameTotals: gameTotalsReducer,
};