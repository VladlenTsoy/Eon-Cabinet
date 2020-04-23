import {Action, Dispatch} from "redux";
import {GameStateProps} from "./game/types";

export type State = {
    game: GameStateProps;
    gameSetting: any;
    gameTotals: any;
};

export type ActionFunctionTypes<ParamTypes, ActionTypes extends Action> = (action: ParamTypes) =>
    (dispatch: Dispatch<ActionTypes>, getState: any) =>
        ActionTypes;