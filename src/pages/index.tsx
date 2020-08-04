import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactGA from "react-ga";
import {Loader} from "../lib/components";
import {ThemeProvider} from "styled-components";
import User from "./user/User";
import Auth from "./auth/Auth";
import {useSelector} from "react-redux";
import {userSelector} from "../store/common/user/userSlice";

const Guest = React.lazy(() => import("./guest/Guest"));

const Index = () => {
    const user = useSelector(userSelector);
    // const match = useRouteMatch({path: '/guest'});
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
                        {user.detail ? <User/> : <Auth/>}
                    </ThemeProvider>
                }/>
            </Switch>
        </Router>
    </React.Suspense>
};

export default Index;