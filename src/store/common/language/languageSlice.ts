import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherState} from "../../access/teacher/store";
import {fetchLanguage} from "./fetchLanguage";
import cookie from "js-cookie";

export interface Language {
    id: string;
    title: string;
    abbr: string;
    url_icon?: string;
}

interface StateProps {
    loading: boolean;
    data: any;
    title: string;
    abbr: string;
    languages: Language[]
}

const initialState: StateProps = {
    title: 'Русский',
    abbr: 'ru-RU',
    loading: true,
    languages: [],
    data: {},
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {},
    extraReducers: {
        //
        [fetchLanguage.pending]: (state) => {
            state.loading = true;
        },
        [fetchLanguage.fulfilled]: (state, action: PayloadAction<any>) => {
            //
            state.title = action.payload.title;
            state.data = action.payload.data;
            state.abbr = action.payload.abbr;
            // state.languages = action.payload.languages;
            state.loading = false;
            //
            cookie.set('language', state.abbr, { expires: 7 });
        }
    }
});

export const languageSelector = (state: TeacherState) => state.language;

export default languageSlice.reducer;