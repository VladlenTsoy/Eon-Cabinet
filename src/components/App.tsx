import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from "./auth/Auth";
import User from "./user/User";
import {useDispatch, useSelector} from "react-redux";
import {apiChangeAccessToken} from "store/api/actions";
import {fetchCurrentUserData} from "store/user/actions";
import {fetchCurrentLanguage} from "store/language/actions";
import {Spin} from "layouts/components";
import {ThemeProvider} from "styled-components";
import {_theme, blackTheme, whiteTheme} from '../styles/_theme';
import {Loader} from "lib";
import ReactGA from 'react-ga';
import "styles/themes/default.less";
import "styles/themes/dark.less";

const App: React.FC = () => {
    const {user, app, api} = useSelector((state: any) => (state));
    const [userTheme, setUserTheme] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        // Проверка токена для авторизации
        dispatch(apiChangeAccessToken());

        // Запрос текущего языка для платформы
        dispatch(fetchCurrentLanguage());

        // Запрос текущего пользователя
        dispatch(fetchCurrentUserData());
    }, [api.token, dispatch]);

    useEffect(() => {
        // let jivoSite = document.createElement('script');
        // jivoSite.async = true;
        // jivoSite.src = '//code.jivosite.com/widget/sgTNJpRrJZ';
        // document.documentElement.appendChild(jivoSite);
        //
        // ReactGA.initialize('UA-129675719-1');
        // ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {
        const darkHref: any = document.getElementById("app-theme-dark");
        if (user && user.setting) {

            if (user.setting.is_dark) {
                let themeElement = document.createElement('link');
                themeElement.href = darkHref.href;
                themeElement.rel = 'stylesheet';
                themeElement.id = 'theme-style';
                document.body.append(themeElement);
            } else {
                let themeElement: any = document.getElementById('theme-style');
                if (themeElement)
                    themeElement.remove();
            }

            document.body.setAttribute("data-theme", user.setting.is_dark ? "dark" : "default");
            setUserTheme(Object.assign(user.setting.is_dark ? blackTheme : whiteTheme, _theme[user.theme || 'default-theme-eon']));
        } else {
            let themeElement: any = document.getElementById('theme-style');
            if (themeElement)
                themeElement.remove();
            document.body.setAttribute("data-theme", "default");
        }
    }, [user]);

    // Fetch language and current user data
    return <ThemeProvider theme={userTheme}>
        <Router>
            {app.loading ?
                <Loader text="Загрузка..."/> :
                <Spin spinning={app.spin} tip="Изменяем тему...">
                    <Switch>
                        <Route exact path="**" render={() => user.id ? <User/> : <Auth/>}/>
                    </Switch>
                </Spin>
            }
        </Router>
    </ThemeProvider>
};

export default App