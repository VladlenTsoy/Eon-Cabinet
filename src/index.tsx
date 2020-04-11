import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/es/locale-provider/ru_RU';
import {store} from "./store/rootReducer";
import {Provider} from "react-redux";
import moment from "moment";
import 'moment/locale/ru';

moment.locale("ru");

ReactDOM.render(
    <ConfigProvider locale={ruRU}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ConfigProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
