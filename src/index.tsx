import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/es/locale-provider/ru_RU';
import {locale} from "moment";
import 'moment/locale/ru';
import './styles/index.less';
import {AppProvider} from "./store/context/appContext";
import {BrowserRouter as Router} from "react-router-dom";
import {detect} from "detect-browser";
import '@babel/polyfill';

const browser = detect();
locale("ru");

const majorVersion = (version: string | null | undefined): number => {
    if (!version)
        return 0;
    const arr = version.split('.')
    return Number(arr[0]);
}

if (
    (browser?.name === 'ie' && majorVersion(browser?.version) > 10) ||
    (browser?.name === 'samsung' && majorVersion(browser?.version) > 11) ||
    (browser?.name === 'edge' && majorVersion(browser?.version) > 16) ||
    (browser?.name === 'firefox' && majorVersion(browser?.version) > 52) ||
    (browser?.name === 'chrome' && majorVersion(browser?.version) > 57) ||
    (browser?.name === 'crios' && majorVersion(browser?.version) > 57) ||
    (browser?.name === 'safari' && majorVersion(browser?.version) > 10.3) ||
    (browser?.name === 'ios' && majorVersion(browser?.version) > 10.3) ||
    (browser?.name === 'opera' && majorVersion(browser?.version) > 44)
)
    ReactDOM.render(
        <ConfigProvider locale={ruRU}>
            <AppProvider>
                <Router>
                    <App/>
                </Router>
            </AppProvider>
        </ConfigProvider>, document.getElementById('root')
    );
else
    ReactDOM.render(
        <>
            <div style={{textAlign: "center", fontSize: '4vw'}}>
                Ваш браузер не поддерживается, обновите или скачайте другой!
            </div>
        </>, document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
process.env.NODE_ENV === 'production' ? serviceWorker.register() : serviceWorker.unregister();
