import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {fetchLanguage} from "./fetchLanguage"
import {setCookie} from "../../../utils/cookie"
import {Language} from "../../../lib/types/common/Language"
import {CommonState} from "../store"

export const languageAdapter = createEntityAdapter<Language>({
    sortComparer: (a, b) => a.id > b.id ? 1 : 0
})

interface StateProps {
    loading: boolean;
    data: any;
    title: string;
    abbr: string;
}

const initialState = languageAdapter.getInitialState<StateProps>({
    title: "Русский",
    abbr: "ru-RU",
    loading: true,
    data: {}
})

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //
        builder.addCase(fetchLanguage.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchLanguage.fulfilled, (state, action) => {
            //
            state.title = action.payload.title
            state.data = action.payload.data
            state.abbr = action.payload.abbr
            languageAdapter.upsertMany(state, action.payload.languages)
            state.loading = false
            //
            setCookie("language", action.payload.abbr, {expires: 7})
        })
    }
})

export const {
    selectById: getLanguageById,
    selectAll: selectAllLanguages
} = languageAdapter.getSelectors<CommonState>(state => state.language)

export default languageSlice.reducer