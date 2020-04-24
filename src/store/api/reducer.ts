import axios from "axios";
import {API_CHANGE_ACCESS_TOKEN, API_DELETE_ACCESS_TOKEN} from "./actions";

// let DOMAIN_API = 'http://192.168.1.105:8000/api';
let DOMAIN_API = 'http://api.eon.loc/api';

if (process.env.NODE_ENV === 'production') {
    DOMAIN_API = 'https://api.eon.uz/api';
    // DOMAIN_API = 'http://api2.eon.uz/api';
}

export const apiReducer = (state = {
    token: localStorage.getItem('EON_API_TOKEN_ACCESS'),
    guest: axios.create({baseURL: DOMAIN_API}),
    user_general: axios.create({baseURL: DOMAIN_API + '/user'}),
}, action: any) => {
    switch (action.type) {
        case API_CHANGE_ACCESS_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case API_DELETE_ACCESS_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
};