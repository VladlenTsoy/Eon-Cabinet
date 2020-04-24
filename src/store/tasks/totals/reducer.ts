import {TOTALS_CHANGE, TotalsReducerTypes, SelectTotalsTypes} from "./types";

export const totalsSelect: SelectTotalsTypes = (state) => state.gameTotals;

export const gameTotalsReducer: TotalsReducerTypes = (
    state = [], action
) => {
    if (action.type === TOTALS_CHANGE) {
        return action.payload;
    }
    return state;
};