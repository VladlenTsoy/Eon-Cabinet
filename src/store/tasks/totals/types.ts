import {ActionFunctionTypes, State} from "../../rootTypes";
import {Reducer} from "redux";

export const TOTALS_CHANGE = "TOTALS_CHANGE";

interface anzanTotalProps {
    output: number[] | string[];
    exercises: number[];
    answer: number;
    user: number;
    result: boolean;
}

type TotalsStateProps = { [currentTimes: number]: anzanTotalProps };

interface TotalsActionTypes {
    type: typeof TOTALS_CHANGE;
    payload: TotalsStateProps;
}

export type TotalsChangeTypes = ActionFunctionTypes<TotalsStateProps, TotalsActionTypes>;

export type TotalsReducerTypes = Reducer<TotalsStateProps, TotalsActionTypes>;

export type SelectTotalsTypes = (state: State) => TotalsStateProps;
