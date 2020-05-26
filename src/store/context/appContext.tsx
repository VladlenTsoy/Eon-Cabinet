import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Loader} from "../../lib";

interface User {
    id: number;
    setting: any;
    theme: string;
    access: 'student' | 'teacher' | 'director-franchise' | 'admin';
    login: string;
    first_name: string;
    last_name: string;
    image: string;
}

const DOMAIN_API = process.env.NODE_ENV === 'production' ? 'https://api.eon.uz/api' : 'http://192.168.1.105:8000/api';

const apiInitial = {
    token: localStorage.getItem('EON_API_TOKEN_ACCESS') || '',
    guest: axios.create({baseURL: DOMAIN_API}),
    user: axios.create({baseURL: DOMAIN_API + '/user'}),
};

interface InitialState {
    user: User | any;
    language: any;
    api: typeof apiInitial;
    updateToken: (token: string) => void;
    updateUser: (data: User | null) => void;
    updateLanguage: (language: any) => void;
}

const initialState: InitialState = {
    user: null,
    language: null,
    api: apiInitial,
    updateToken: (token) => token,
    updateUser: (data) => data,
    updateLanguage: (data) => data
};

export const AppContext = React.createContext(initialState);

export const AppProvider: React.FC = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(initialState.user);
    const [language, setLanguage] = useState(initialState.language);
    const [api, setApi] = useState(initialState.api);

    const updateToken = useCallback((token) => {
        setApi((prevState) => ({...prevState, token}));
    }, []);

    const updateUser = useCallback((data) => {
        setUser(data);
    }, []);

    const updateLanguage = useCallback((data) => {
        setLanguage(data);
    }, []);

    const fetchUser = useCallback(async () => {
        try {
            const response = await api.user.get<User>(``);
            setUser(response.data);
        } catch (e) {

        }
    }, [api.user]);

    const fetchLanguage = useCallback(async () => {
        try {
            const response = await api.guest.get(`/language`);
            setLanguage(response.data.data);
        } catch (e) {

        }
    }, [api.guest]);

    useEffect(() => {
        localStorage.setItem('EON_API_TOKEN_ACCESS', api.token);
        api.user.defaults.headers.common["Authorization"] = "Bearer " + api.token;

        (async () => {
            setLoading(true);
            await fetchLanguage();
            await fetchUser();
            setLoading(false);
        })();
    }, [api.token, api.user, fetchUser, fetchLanguage]);

    return <AppContext.Provider value={{user, api, language, updateToken, updateUser, updateLanguage}}>
        {loading ? <Loader text="Загрузка..."/> : children}
    </AppContext.Provider>
};