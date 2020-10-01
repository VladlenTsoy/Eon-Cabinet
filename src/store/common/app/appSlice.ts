import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommonState} from "../store";
import {getCookie, setCookie} from "../../../utils/cookie";

interface StateProps {
    title: string;
    statusContainer: boolean;
    action: string | null;
    spin: boolean;
    isDark: boolean;
    setting: null;
}

const initialState: StateProps = {
    title: 'Моя страница',
    statusContainer: false,
    action: null,
    spin: false,
    isDark: getCookie('is_dark') === '1',
    setting: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeTitle(state, action: PayloadAction<StateProps["title"]>) {
            state.title = action.payload
        },
        changeStatusContainer(state, action: PayloadAction<StateProps["statusContainer"]>) {
            state.statusContainer = action.payload
        },
        changeAction(state, action: PayloadAction<StateProps["action"]>) {
            state.action = action.payload
        },
        changeSpin(state, action: PayloadAction<StateProps["spin"]>) {
            state.spin = action.payload
        },
        changeIsDark(state, action: PayloadAction<StateProps["isDark"]>) {
            setCookie('is_dark', action.payload ? '1' : '0')
            state.isDark = action.payload
        },
    }
});

export const {changeAction, changeStatusContainer, changeTitle, changeIsDark} = appSlice.actions;

export const appSelector = (state: CommonState) => state.app;

type KeyProps =
    | 'action'
    | 'spin'
    | 'title';

export const appSubSelector = (key: KeyProps) => (state: CommonState) => state.app[key];

export default appSlice.reducer;