import React, {useCallback, useEffect, useState} from "react";
import {Loader} from "../../lib";
import {api, updateToken} from "utils/api";

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

interface InitialState {
    user: User | any;
    language: any;
    api: typeof api;
    updateToken: (token: string) => void;
    updateUser: (data: User | null) => void;
    updateLanguage: (language: any) => void;
}

const initialState: InitialState = {
    user: null,
    language: null,
    api: api,
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

    const updateApiToken = useCallback((token) => {
        setApi((prevState) => ({...prevState, token}));
    }, []);

    const updateUser = useCallback((data) => {
        setUser(prevState => {
            if (prevState && data)
                return {...prevState, ...data};
            else
                return data;
        });
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
        updateToken(api.token);
        // api.user.defaults.headers.common["Authorization"] = "Bearer " + api.token;

        (async () => {
            setLoading(true);
            await fetchLanguage();
            await fetchUser();
            setLoading(false);
        })();
    }, [api.token, api.user, fetchUser, fetchLanguage]);

    return <AppContext.Provider value={{user, api, language, updateToken: updateApiToken, updateUser, updateLanguage}}>
        {loading ? <Loader text="Загрузка..."/> : children}
    </AppContext.Provider>
};