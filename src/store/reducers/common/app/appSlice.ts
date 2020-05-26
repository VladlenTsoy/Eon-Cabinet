import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StateProps {
    title: string;
    action: string | null;
    spin: boolean;
    activeDisciplineId: string | undefined;
    setting: null;
    algorithms: null;
    disciplines: object|null;
    categories: null;
}

const initialState: StateProps = {
    title: 'Моя страница',
    action: null,
    spin: false,
    activeDisciplineId: undefined,
    setting: null,
    algorithms: null,
    disciplines: null,
    categories: null,
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
        changeSpin(state, action: PayloadAction<boolean>){
            state.spin = action.payload
        },
        changeDisciplines(state, action: PayloadAction<object>){
            state.disciplines = action.payload
        },
        changeActiveDisciplineId(state, action: PayloadAction<string | undefined>){
            state.activeDisciplineId = action.payload
        },
        changeBasicSettings(state, action: PayloadAction<any>){
            state.algorithms = action.payload.algorithms;
            state.disciplines = action.payload.disciplines;
            state.categories = action.payload.categories;
        }
    }
});

export const {changeAction, changeSpin, changeTitle, changeDisciplines, changeActiveDisciplineId, changeBasicSettings} = appSlice.actions;

export default appSlice.reducer;