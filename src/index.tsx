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

locale("ru");

ReactDOM.render(
    <ConfigProvider locale={ruRU}>
        <AppProvider>
            <App/>
        </AppProvider>
    </ConfigProvider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
process.env.NODE_ENV === 'production' ? serviceWorker.register() : serviceWorker.unregister();
