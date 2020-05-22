import {Action, Dispatch} from "redux";

export type State = {
    game: any;
    gameSetting: any;
    gameTotals: any;
};

export type ActionFunctionTypes<ParamTypes, ActionTypes extends Action> = (action: ParamTypes) =>
    (dispatch: Dispatch<ActionTypes>, getState: any) =>
        ActionTypes;