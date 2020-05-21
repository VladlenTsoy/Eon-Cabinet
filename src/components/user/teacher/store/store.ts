import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

const teacherReducer = combineReducers({});

export const store = createStore(teacherReducer, applyMiddleware(thunk));