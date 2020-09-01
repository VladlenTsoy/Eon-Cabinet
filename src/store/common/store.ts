import {combineReducers, configureStore} from "@reduxjs/toolkit";
import app from "./app/appSlice";
import language from "./language/languageSlice";
import game from "./game/gameSplice";
import user from "./user/userSlice";
import {useDispatch} from "react-redux";
import contacts from "../../lib/modules/chat/reducer/contacts/contactsSlice"
import messages from "../../lib/modules/chat/reducer/messages/messagesSlice"

export type CommonState = ReturnType<typeof commonReducer>

export const commonReducer = combineReducers({
    app,
    language,
    game,
    user,
    contacts,
    messages,
});

export type AppDispatch = typeof store.dispatch

export interface CommonThunkProps {
    dispatch: AppDispatch
    state: CommonState
    extra?: unknown
    rejectValue?: unknown
}

export const useCommonDispatch = () => useDispatch<AppDispatch>()

export const store = configureStore({
    reducer: commonReducer,
});