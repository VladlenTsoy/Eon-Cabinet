import appReducer from "./app/appSlice";
import gameReducer from "./game/gameSplice";

export const commonReducer = {
    app: appReducer,
    game: gameReducer,
};