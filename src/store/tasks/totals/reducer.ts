import {TOTALS_CHANGE, TotalsReducerTypes, SelectTotalsTypes} from "./types";

export const totals: SelectTotalsTypes = (state) => state.gameSetting;

export const gameTotalsReducer: TotalsReducerTypes = (
    state, action
) => {
    if (action.type === TOTALS_CHANGE) {
        return {
            ...state,
            ...action.payload
        };
    }
};