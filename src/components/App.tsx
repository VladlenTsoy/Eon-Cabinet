import React, {useEffect, useState} from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Auth from "./auth/Auth";
import User from "./user/User";
import {ThemeProvider} from "styled-components";
import {_theme, blackTheme, whiteTheme} from '../styles/_theme';
import {GlobalStyle} from '../styles/global';
import ReactGA from 'react-ga';
import "styles/themes/default.less";
import "styles/themes/dark.less";
import {useAppContext} from "../store/context/use-app-context";
import {Loader} from "../lib";

const Guest = React.lazy(() => import("./guest/Guest"));

const App: React.FC = () => {
    const match = useRouteMatch({path: '/guest'});
    const {user} = useAppContext();
    const [userTheme, setUserTheme] = useState({});

    useEffect(() => {
        if (process.env.NODE_ENV === 'production')
            window.onload = () => {
                ReactGA.initialize('UA-129675719-1');
                ReactGA.pageview(window.location.pathname + window.location.search);
            }
    }, []);

    useEffect(() => {
        if (user)
            setUserTheme({
                ...user?.setting?.is_dark ? blackTheme : whiteTheme,
                ..._theme[user.theme || 'default-theme-eon']
            });
        else
            setUserTheme({whiteTheme, ..._theme['default-theme-eon']});
    }, [user]);

    // Fetch language and current user data
    return <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
        <ThemeProvider theme={userTheme}>
            <GlobalStyle/>
            <Switch>
                <Route exact path="**" render={() => user?.id ? <User/> : match ? <Guest/> : <Auth/>}/>
            </Switch>
        </ThemeProvider>
    </React.Suspense>
};

export default App