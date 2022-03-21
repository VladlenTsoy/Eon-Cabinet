import React, {useEffect, useState} from "react"
import {Loader} from "lib/ui"
import {fetchLanguage} from "store/language/fetchLanguage"
import {locale} from "moment"
import {ConfigProvider} from "antd"
import ruRU from "antd/es/locale-provider/ru_RU"
import enUs from "antd/es/locale-provider/en_US"
import "moment/locale/ru"
import "moment/locale/en-ie"
import {getCookie} from "../../../utils/cookie"
import {useDispatch} from "store/store"
import {
    useLoadingLanguage,
    useSelectCurrentLanguage
} from "store/language/languageSelectors"

const browserLanguage = getCookie("language") || navigator.language || "ru-RU"

const LanguageProvider: React.FC = ({children}) => {
    const loading = useLoadingLanguage()
    const currentLanguage = useSelectCurrentLanguage()
    const [antLang, setAntLang] = useState(
        currentLanguage.abbr === "ru-RU" ? ruRU : enUs
    )
    const dispatch = useDispatch()

    useEffect(() => {
        locale(currentLanguage.abbr === "ru-RU" ? "ru" : "en")
        setAntLang(currentLanguage.abbr === "ru-RU" ? ruRU : enUs)
    }, [currentLanguage.abbr])

    useEffect(() => {
        const promise = dispatch(fetchLanguage({abbr: browserLanguage}))
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading)
        return (
            <Loader
                text={
                    browserLanguage === "ru-RU"
                        ? "Загрузка языка..."
                        : "Language loading..."
                }
            />
        )

    return <ConfigProvider locale={antLang}>{children}</ConfigProvider>
}

export default LanguageProvider
