import {configureStore, combineReducers} from "@reduxjs/toolkit";
import user from './common/user/userSlice';
import app from './common/app/appSlice';
import language from './common/language/languageSlice';

export const rootReducer = combineReducers({
    user,
    app,
    language,
})
export type StoreState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch
