import {ActionFunctionTypes, State} from "../../../../rootTypes";
import {Reducer} from "redux";

export const TOTALS_CHANGE = "TOTALS_CHANGE";

interface anzanTotalProps {
    output?: any;
    exercise: number[] | number;
    answer: number;
    user?: number;
    result?: boolean;
}

// type doubleTotalsProps = anzanTotalProps[];

type TotalsStateProps = { [currentTimes: number]: anzanTotalProps };

interface TotalsActionTypes {
    type: typeof TOTALS_CHANGE;
    payload: TotalsStateProps;
}

export type TotalsChangeTypes = ActionFunctionTypes<TotalsStateProps, TotalsActionTypes>;

export type TotalsReducerTypes = Reducer<TotalsStateProps, TotalsActionTypes>;

export type SelectTotalsTypes = (state: State) => TotalsStateProps;
