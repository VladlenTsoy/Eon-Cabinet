import {
    GAME_CHANGE_CURRENT_TIMES,
    GAME_CHANGE_OUTPUT,
    GAME_CHANGE_SETTING,
    GAME_CHANGE_STATS,
    GAME_CHANGE_STATUS,
    GAME_CHANGE_TOTALS
} from "./actions";

export const gameReducer = (state: any = {
    status: 'start',
    currentTimes: 1,
    totals: [],
    setting: null,
    output: null,
    stats: {all: 0, success: 0},
}, action: any) => {
    switch (action.type) {
        case GAME_CHANGE_STATUS:
            return {
                ...state,
                status: action.payload
            };

        case GAME_CHANGE_CURRENT_TIMES:
            return {
                ...state,
                currentTimes: action.payload
            };

        case GAME_CHANGE_SETTING:
            return {
                ...state,
                setting: action.payload
            };

        case GAME_CHANGE_TOTALS:
            return {
                ...state,
                totals: action.payload
            };

        case GAME_CHANGE_STATS:
            return {
                ...state,
                stats: action.payload
            };

        case GAME_CHANGE_OUTPUT:
            return {
                ...state,
                output: action.payload
            };
    }
    return state;
};