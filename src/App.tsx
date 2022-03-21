import React from "react"
import "styles/themes/dark.less"
import "styles/__style.css"
import {Provider} from "react-redux"
import LanguageProvider from "./lib/providers/language-provider/LanguageProvider"
import UserProvider from "./lib/providers/user-provider/UserProvider"
import StoreProvider from "./lib/providers/store-provider/StoreProvider"
import Index from "./pages"
import {store} from "./store/store"
import BrowserSupportProvider from "./lib/providers/browser-support-provider/BrowserSupportProvider"
import {ThemeProvider} from "styled-components"
import {blackTheme, _theme} from "./styles/_theme"
import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import Backend from "i18next-http-backend"

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: "ru",
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false
        }
    })

const App: React.FC = () => {
    return <BrowserSupportProvider>
        <Provider store={store}>
            <ThemeProvider theme={{..._theme["default-theme-eon"], ...blackTheme}}>
                <LanguageProvider>
                    <UserProvider>
                        <Index />
                    </UserProvider>
                </LanguageProvider>
            </ThemeProvider>
        </Provider>
    </BrowserSupportProvider>
}

export default App
