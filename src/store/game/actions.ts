import {Dispatch} from "redux";
import {playingSound} from "../../tools/playing-sound.tool";

export const GAME_CHANGE_STATUS = "GAME_CHANGE_STATUS";
export const GAME_CHANGE_CURRENT_TIMES = "GAME_CHANGE_CURRENT_TIMES";
export const GAME_CHANGE_SETTING = "GAME_CHANGE_SETTING";
export const GAME_CHANGE_TOTALS = "GAME_CHANGE_TOTALS";
export const GAME_CHANGE_STATS = "GAME_CHANGE_STATS";
export const GAME_CHANGE_OUTPUT = "GAME_CHANGE_OUTPUT";

export const gameChangeStatus = (action: any) =>
    (dispatch: Dispatch, getState: any) => {
        if (action === 'repeat')
            dispatch({type: GAME_CHANGE_CURRENT_TIMES, payload: 1});
        if (action === 'again') {
            dispatch({type: GAME_CHANGE_TOTALS, payload: []});
            dispatch({type: GAME_CHANGE_CURRENT_TIMES, payload: 1});
        }
        if (action === 'start')
            dispatch({type: GAME_CHANGE_CURRENT_TIMES, payload: getState().game.currentTimes + 1});

        dispatch({type: GAME_CHANGE_STATUS, payload: action});
    };

export const gameChangeCurrentTimes = (action: any) =>
    (dispatch: Dispatch) =>
        dispatch({type: GAME_CHANGE_CURRENT_TIMES, payload: action});

export const gameChangeSetting = (action: object | null) =>
    (dispatch: Dispatch) =>
        dispatch({type: GAME_CHANGE_SETTING, payload: action});

export const gameChangeTotals = (action: any) =>
    (dispatch: Dispatch) =>
        dispatch({type: GAME_CHANGE_TOTALS, payload: action});

export interface StatsProps {
    all?: number;
    success?: number;
}

export const gameChangeStats = (action: StatsProps) =>
    (dispatch: Dispatch, getState: any) =>
        dispatch({type: GAME_CHANGE_STATS, payload: {...getState().game.stats, ...action}});

export const gameChangeOutput = (action: any) =>
    (dispatch: Dispatch, getState: any) => {

        if (getState().game.setting && getState().game.setting.sound === 'en')
            switch (action) {
                case 'На старт':
                    action = 'Ready';
                    break;
                case 'Внимание':
                    action = 'Set';
                    break;
                case 'Марш':
                    action = 'Go';
                    break;
            }

        playingSound(action, getState().game.setting);
        return dispatch({type: GAME_CHANGE_OUTPUT, payload: action});
    };