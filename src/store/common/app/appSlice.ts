import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommonState} from "../store";
import cookie from "js-cookie";

interface StateProps {
    title: string;
    action: string | null;
    spin: boolean;
    isDark: boolean;
    setting: null;
}

const initialState: StateProps = {
    title: 'Моя страница',
    action: null,
    spin: false,
    isDark: cookie.get('is_dark') === '1',
    setting: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeTitle(state, action: PayloadAction<StateProps["title"]>) {
            state.title = action.payload
        },
        changeAction(state, action: PayloadAction<StateProps["action"]>) {
            state.action = action.payload
        },
        changeSpin(state, action: PayloadAction<StateProps["spin"]>) {
            state.spin = action.payload
        },
        changeIsDark(state, action: PayloadAction<StateProps["isDark"]>) {
            cookie.set('is_dark', action.payload ? '1' : '0')
            state.isDark = action.payload
        },
    }
});

export const {changeAction, changeSpin, changeTitle, changeIsDark} = appSlice.actions;

export const appSelector = (state: CommonState) => state.app;

type KeyProps =
    | 'action'
    | 'spin'
    | 'title';

export const appSubSelector = (key: KeyProps) => (state: CommonState) => state.app[key];

export default appSlice.reducer;