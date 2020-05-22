import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from "./auth/Auth";
import User from "./user/User";
import {ThemeProvider} from "styled-components";
import {_theme, blackTheme, whiteTheme} from '../styles/_theme';
import {GlobalStyle} from '../styles/global';
import {Loader} from "lib";
import ReactGA from 'react-ga';
import "styles/themes/default.less";
import "styles/themes/dark.less";
import {fetchUser} from "../api/user.api";

export const UserContext:any = React.createContext(null);

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [userTheme, setUserTheme] = useState({});

    useEffect(() => {
        (async () => {
            setLoading(true);
            const user = await fetchUser();
            setUser(user);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (process.env.NODE_ENV === 'production')
            window.onload = () => {
                let jivoSite = document.createElement('script');
                jivoSite.async = true;
                jivoSite.src = '//code.jivosite.com/widget/sgTNJpRrJZ';
                document.documentElement.appendChild(jivoSite);

                ReactGA.initialize('UA-129675719-1');
                ReactGA.pageview(window.location.pathname + window.location.search);
            }
    }, []);

    useEffect(() => {
        if (user)
            setUserTheme(Object.assign(user?.setting?.is_dark ? blackTheme : whiteTheme, _theme[user.theme || 'default-theme-eon']));
    }, [user]);

    // Fetch language and current user data
    return <ThemeProvider theme={userTheme}>
        <GlobalStyle/>
        <Router>
            {loading ?
                <Loader text="Загрузка..."/> :

                <Switch>
                    <Route exact path="**" render={() => user?.id ?
                        <UserContext.Provider value={user}>
                            <User/>
                        </UserContext.Provider> :
                        <Auth/>
                    }/>
                </Switch>
            }
        </Router>
    </ThemeProvider>
};

export default App