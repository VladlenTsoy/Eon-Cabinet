import {TOTALS_CHANGE, TotalsChangeTypes} from "./types";

export const totalsChange: TotalsChangeTypes = (action: any) =>
    (dispatch) => dispatch({type: TOTALS_CHANGE, payload: action});
