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
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        if (user.detail)
            setUserTheme({
                ...user.detail?.setting?.is_dark ? blackTheme : whiteTheme,
                ..._theme['default-theme-eon']
            });
        else
            setUserTheme({
                ...app.isDark ? blackTheme : whiteTheme,
                ..._theme['default-theme-eon']
            });
    }, [user.detail, app.isDark])

    useEffect(() => {
        const darkHref: any = document.getElementById("app-theme-dark");
        const themeElement: any = document.getElementById('theme-style');

        if (isDarkTheme && !themeElement) {
            let themeElement = document.createElement('link');
            themeElement.href = darkHref.href;
            themeElement.rel = 'stylesheet';
            themeElement.id = 'theme-style';
            document.body.append(themeElement);
        } else if (themeElement)
            themeElement.remove();

        document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "default");

        return () => {
            let themeElement: any = document.getElementById('theme-style');
            if (themeElement)
                themeElement.remove();
            document.body.setAttribute("data-theme", "default");
        }
    }, [isDarkTheme]);

    useEffect(() => {
        setIsDarkTheme(!!user.detail?.setting?.is_dark);
    }, [user.detail]);

    return <ThemeProviderStyled theme={userTheme}>
        {children}
    </ThemeProviderStyled>
};

export default ThemeProvider;