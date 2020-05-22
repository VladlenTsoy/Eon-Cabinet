import {
    GAME_CHANGE_CURRENT_TIMES, GAME_CHANGE_DISPLAY_TYPE, GAME_CHANGE_EXECUTION_MODE,
    GAME_CHANGE_STATS,
    GAME_CHANGE_STATUS,
    GameChangeCurrentTimesTypes, GameChangeDisplayTypeTypes,
    GameChangeExecutionModeTypes,
    GameChangeStatsTypes,
    GameChangeStatusTypes,
} from "./types";

export const gameChangeExecutionMode: GameChangeExecutionModeTypes = (action) =>
    (dispatch) =>
        dispatch({type: GAME_CHANGE_EXECUTION_MODE, payload: action});

export const gameChangeStatus: GameChangeStatusTypes = (action) =>
    (dispatch) =>
        dispatch({type: GAME_CHANGE_STATUS, payload: action});

export const gameChangeCurrentTimes: GameChangeCurrentTimesTypes = (action) =>
    (dispatch) =>
        dispatch({type: GAME_CHANGE_CURRENT_TIMES, payload: action});

export const gameChangeDisplayType: GameChangeDisplayTypeTypes = (action: any) =>
    (dispatch) =>
        dispatch({type: GAME_CHANGE_DISPLAY_TYPE, payload: action});

export const gameChangeStats: GameChangeStatsTypes = (action) =>
    (dispatch) =>
        dispatch({type: GAME_CHANGE_STATS, payload: action});