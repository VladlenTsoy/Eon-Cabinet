import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommonState} from "../commonReducer";

interface StateProps {
    title: string;
    action: string | null;
    spin: boolean;
    setting: null;
}

const initialState: StateProps = {
    title: 'Моя страница',
    action: null,
    spin: false,
    setting: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },
        changeAction(state, action: PayloadAction<string | null>) {
            state.action = action.payload
        },
        changeSpin(state, action: PayloadAction<boolean>) {
            state.spin = action.payload
        },
    }
});

export const {changeAction, changeSpin, changeTitle} = appSlice.actions;

export const appSelector = (state: CommonState) => state.app;

type KeyProps =
    | 'action'
    | 'spin'
    | 'title';

export const appSubSelector = (key: KeyProps) => (state: CommonState) => state.app[key];

export default appSlice.reducer;