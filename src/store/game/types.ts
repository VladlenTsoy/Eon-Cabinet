import {Reducer} from "redux";
import {ActionFunctionTypes, State} from "../rootTypes";

export const GAME_CHANGE_EXECUTION_MODE = "GAME_CHANGE_EXECUTION_MODE";
export const GAME_CHANGE_DISPLAY_TYPE = "GAME_CHANGE_DISPLAY_TYPE";
export const GAME_CHANGE_STATUS = "GAME_CHANGE_STATUS";
export const GAME_CHANGE_CURRENT_TIMES = "GAME_CHANGE_CURRENT_TIMES";
export const GAME_CHANGE_STATS = "GAME_CHANGE_STATS";

export type StatusProps = "preparation" | "start" | "answer" | 'intermediate' | 'result';
export type ExecutionModeProps = 'first' | 'repeat' | 'again';
export type DisplayTypeProps = 'basic' | 'list' | 'carousel';
export type StatsProps = { all: number; success: number };
export type StatsActionProps = { all?: number; success?: number };
export type CurrentTimesProps = number;

export interface GameStateProps {
    status: StatusProps,
    displayType: DisplayTypeProps,
    executionMode: ExecutionModeProps,
    stats: StatsProps
    currentTimes: CurrentTimesProps;
}

interface GameModeActionTypes {
    type: typeof GAME_CHANGE_EXECUTION_MODE;
    payload: ExecutionModeProps;
}

interface GameStatusActionTypes {
    type: typeof GAME_CHANGE_STATUS;
    payload: StatusProps;
}

interface GameCurrentTimesActionTypes {
    type: typeof GAME_CHANGE_CURRENT_TIMES;
    payload: CurrentTimesProps;
}

interface GameStatsActionTypes {
    type: typeof GAME_CHANGE_STATS;
    payload: StatsActionProps;
}

interface GameDisplayTypeActionTypes {
    type: typeof GAME_CHANGE_DISPLAY_TYPE;
    payload: DisplayTypeProps;
}

export type GameActionTypes =
    GameStatusActionTypes
    | GameModeActionTypes
    | GameDisplayTypeActionTypes
    | GameCurrentTimesActionTypes
    | GameStatsActionTypes;

export type GameChangeExecutionModeTypes = ActionFunctionTypes<ExecutionModeProps, GameModeActionTypes>;
export type GameChangeStatusTypes = ActionFunctionTypes<StatusProps, GameStatusActionTypes>;
export type GameChangeCurrentTimesTypes = ActionFunctionTypes<CurrentTimesProps, GameCurrentTimesActionTypes>;
export type GameChangeStatsTypes = ActionFunctionTypes<StatsActionProps, GameStatsActionTypes>;
export type GameChangeDisplayTypeTypes = ActionFunctionTypes<DisplayTypeProps, GameDisplayTypeActionTypes>;

export type GameReducerTypes = Reducer<GameStateProps, GameActionTypes>;

export type SelectGameTypes = (state: State) => GameStateProps;
