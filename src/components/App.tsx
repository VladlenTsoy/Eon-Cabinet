import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from 'react-router-dom';
import Auth from "./auth/Auth";
import User from "./user/User";
import {ThemeProvider} from "styled-components";
import ReactGA from 'react-ga';
import "styles/themes/default.less";
import "styles/themes/dark.less";
import {Loader} from "../lib";

const Guest = React.lazy(() => import("./guest/Guest"));

const App: React.FC = () => {
    const match = useRouteMatch({path: '/guest'});
    const [userTheme] = useState({});

    useEffect(() => {
        if (process.env.NODE_ENV === 'production')
            window.onload = () => {
                ReactGA.initialize('UA-129675719-1');
                ReactGA.pageview(window.location.pathname + window.location.search);
            }
    }, []);

    // useEffect(() => {
    //     if (user)
    //         setUserTheme({
    //             ...user?.setting?.is_dark ? blackTheme : whiteTheme,
    //             ..._theme[user.theme || 'default-theme-eon']
    //         });
    // }, [user]);

    // Fetch language and current user data
    return <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
        <Router>
            <Switch>
                <Route exact path="**" render={() =>
                    <ThemeProvider theme={userTheme}>
                        {localStorage.getItem('EON_API_TOKEN_ACCESS') ? <User/> : match ? <Guest/> : <Auth/>}
                    </ThemeProvider>
                }/>
            </Switch>
        </Router>
    </React.Suspense>
};

export default App