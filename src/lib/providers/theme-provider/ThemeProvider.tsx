import React, {useEffect, useState} from 'react';
import {ThemeProvider as ThemeProviderStyled} from "styled-components";
import {useSelector} from "react-redux";
import {userSelector} from "../../../store/common/user/userSlice";
import {_theme, blackTheme, whiteTheme} from 'styles/_theme';
import {appSelector} from "../../../store/common/app/appSlice";

const ThemeProvider: React.FC = ({children}) => {
    const user = useSelector(userSelector);
    const app = useSelector(appSelector);
    const [userTheme, setUserTheme] = useState({});

    useEffect(() => {
        if (user.detail)
            setUserTheme({
                ...user.detail?.setting?.is_dark ? blackTheme : whiteTheme,
                // ..._theme[user.detail.theme || 'default-theme-eon']
                ..._theme['default-theme-eon']
            });
        else
            setUserTheme({
                ...app.isDark ? blackTheme : whiteTheme,
                ..._theme['default-theme-eon']
            });
    }, [user.detail, app.isDark])

    return <ThemeProviderStyled theme={userTheme}>
        {children}
    </ThemeProviderStyled>
};

export default ThemeProvider;