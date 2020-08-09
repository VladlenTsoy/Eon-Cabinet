import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {languageSelector} from "../../../store/common/language/languageSlice";
import {Loader} from "lib/components";
import {fetchLanguage} from "../../../store/common/language/fetchLanguage";
import {locale} from "moment";
import {ConfigProvider} from 'antd';
import ruRU from 'antd/es/locale-provider/ru_RU';
import enUs from 'antd/es/locale-provider/en_US';
import cookie from 'js-cookie';

const browserLanguage = cookie.get('language') || navigator.language;

const LanguageProvider: React.FC = ({children}) => {
    const language = useSelector(languageSelector);
    const [antLang, setAntLang] = useState(language.abbr === 'ru-RU' ? ruRU : enUs);
    const dispatch = useDispatch();

    useEffect(() => {
        locale(language.abbr === 'ru-RU' ? 'ru' : 'en');
        setAntLang(language.abbr === 'ru-RU' ? ruRU : enUs);
    }, [language.abbr]);

    useEffect(() => {
        const promise = dispatch(fetchLanguage(browserLanguage));
        return () => {
            promise.abort();
        }
    }, [dispatch]);

    if (language.loading)
        return <Loader text={
            browserLanguage === 'ru-RU' ?
                'Загрузка языка...' :
                'Language loading...'
        }/>;

    return <ConfigProvider locale={antLang}>
        {children}
    </ConfigProvider>;
};

export default LanguageProvider;