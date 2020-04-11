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
import {_theme} from '../styles/_theme';
import {Loader} from "lib";
// @ts-ignore
// import { changeTheme } from 'themes-switch';

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
        if (user && user.setting) {
            // if (user.setting.is_dark)
            //     changeTheme('themes-dark', 'css/theme-dark.css');
            // else
            //     changeTheme('themes-light', 'css/theme-light.css');

            // @ts-ignore
                // import (/* webpackPrefetch: true */ /* webpackChunkName: "dark" */ 'styles/themes/dark.less');
            setUserTheme(_theme[user.theme || 'default-theme-eon']);
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