import axios from "axios";

const DOMAIN_API = process.env.NODE_ENV === 'production' ? 'https://api.eon.uz/api' : 'http://192.168.1.37:8000/api';

export const api = {
    token: localStorage.getItem('EON_API_TOKEN_ACCESS') || '',
    guest: axios.create({baseURL: DOMAIN_API}),
    user: axios.create({baseURL: DOMAIN_API + '/user'}),
};

export const updateToken = (token:string) => {
    api.token = token;
    api.user.defaults.headers.common["Authorization"] = "Bearer " + token
}