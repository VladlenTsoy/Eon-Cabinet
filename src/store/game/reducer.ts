import {
    GAME_CHANGE_CURRENT_TIMES,
    GAME_CHANGE_DISPLAY_TYPE,
    GAME_CHANGE_EXECUTION_MODE,
    GAME_CHANGE_STATS,
    GAME_CHANGE_STATUS,
    GameReducerTypes, SelectGameTypes,
} from "./types";

export const game: SelectGameTypes = (state) => state.game;

export const gameReducer: GameReducerTypes = (state = {
    status: 'start',
    displayType: 'basic',
    executionMode: 'first',
    currentTimes: 1,
    stats: {all: 0, success: 0},
}, action) => {
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

        case GAME_CHANGE_STATS:
            return {
                ...state,
                stats: action.payload
            };

        case GAME_CHANGE_EXECUTION_MODE:
            return {
                ...state,
                executionMode: action.payload
            };

        case GAME_CHANGE_DISPLAY_TYPE:
            return {
                ...state,
                displayType: action.payload
            };
    }
};