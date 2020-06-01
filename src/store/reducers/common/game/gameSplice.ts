import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../../teacher/store";

export type StatusProps = "start" | "answer" | 'intermediate' | 'result';
export type ExecutionModeProps = 'first' | 'repeat' | 'again';
export type DisplayTypeProps = 'basic' | 'list' | 'carousel';
export type StatsProps = { all: number; success: number };
export type StatsActionProps = { all?: number; success?: number };
export type CurrentTimesProps = number;

interface StateProps {
    status: StatusProps,
    displayType: DisplayTypeProps,
    executionMode: ExecutionModeProps,
    stats: StatsProps
    currentTimes: CurrentTimesProps;
    setting: any;
    totals: any;
}

const initialState: StateProps = {
    status: 'start',
    displayType: 'basic',
    executionMode: 'first',
    currentTimes: 0,
    stats: {all: 0, success: 0},
    setting: null,
    totals: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeStatus(state, action: PayloadAction<StatusProps>){
            state.status = action.payload
        },
        changeExecutionMode(state, action: PayloadAction<ExecutionModeProps>){
            state.executionMode = action.payload
        },
        changeCurrentTimes(state, action: PayloadAction<CurrentTimesProps>){
            state.currentTimes = action.payload;
        },
        changeStats(state, action: PayloadAction<StatsActionProps>){
            state.stats = {...state.stats, ...action.payload};
        },
        changeSetting(state, action: PayloadAction<any>){
            state.setting = action.payload;
        },
        changeTotals(state, action: PayloadAction<any>){
            state.totals = action.payload;
        },
        clearGame(state){
            state = initialState;
        },
        nextGame(state){
            state.status = 'start';
            state.currentTimes += 1
        },
        repeatGame(state, action: PayloadAction<boolean>){
            if(action.payload) state.stats.success -= 1;
            state.executionMode = 'repeat';
            state.status = 'start';
        },
        refreshGame(state){
            state.status = 'start';
            state.executionMode = 'repeat';
            state.currentTimes = 0;
            state.stats = {all: 0, success: 0};
        },
        completionGame(state, action: PayloadAction<boolean>){
            state.status = action.payload ? 'answer' : 'result';
        }
    }
});

export const gameSelector = (state:TeacherState) => state.game;

export const {changeStatus, changeExecutionMode, changeCurrentTimes, changeStats, changeSetting, changeTotals, clearGame, nextGame, repeatGame, completionGame, refreshGame} = gameSlice.actions;

export default gameSlice.reducer;