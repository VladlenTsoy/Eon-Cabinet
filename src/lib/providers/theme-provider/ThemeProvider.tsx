import React, {useEffect, useState} from 'react';
import {ThemeProvider as ThemeProviderStyled} from "styled-components";
import {useSelector} from "react-redux";
import {_theme, blackTheme, whiteTheme} from 'styles/_theme';
import {appSelector} from "../../../store/common/app/appSlice";
// import {Spin} from "../../ui";
import {GlobalStyle} from "../../../styles/global";

const ThemeProvider: React.FC = ({children}) => {
    const app = useSelector(appSelector);
    const [userTheme, setUserTheme] = useState({});

    useEffect(() => {
            setUserTheme({
                ...app.isDark ? blackTheme : whiteTheme,
                ..._theme['default-theme-eon']
            });
    }, [app.isDark])

    useEffect(() => {
        const darkHref: any = document.getElementById("app-theme-dark");
        const themeElement: any = document.getElementById('theme-style');

        if (app.isDark && !themeElement) {
            let themeElement = document.createElement('link');
            themeElement.href = darkHref.href;
            themeElement.rel = 'stylesheet';
            themeElement.id = 'theme-style';
            document.body.append(themeElement);
        } else if (themeElement)
            themeElement.remove();

        document.body.setAttribute("data-theme", app.isDark ? "dark" : "default");

        return () => {
            let themeElement: any = document.getElementById('theme-style');
            if (themeElement)
                themeElement.remove();
            document.body.setAttribute("data-theme", "default");
        }
    }, [app.isDark]);

    return <ThemeProviderStyled theme={userTheme}>
        <GlobalStyle/>
        {/*<Spin spinning={app.spin} tip="Изменяем тему...">*/}
            {children}
        {/*</Spin>*/}
    </ThemeProviderStyled>
};

export default ThemeProvider;