import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../../teacher/store";

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

export const appSelector = (state: TeacherState) => state.app;

export default appSlice.reducer;