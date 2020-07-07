import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from "./auth/Auth";
import User from "./user/User";
import {ThemeProvider} from "styled-components";
// import {_theme, blackTheme, whiteTheme} from '../styles/_theme';
import ReactGA from 'react-ga';
import "styles/themes/default.less";
import "styles/themes/dark.less";

const App: React.FC = () => {
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
    return <Router>
        <Switch>
            <Route exact path="**" render={() =>
                <ThemeProvider theme={userTheme}>
                    {localStorage.getItem('EON_API_TOKEN_ACCESS') ? <User/> : <Auth/>}
                </ThemeProvider>
            }/>
        </Switch>
    </Router>
};

export default App