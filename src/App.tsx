import React, {useEffect} from 'react';
import ReactGA from 'react-ga';
import "styles/themes/default.less";
import "styles/themes/dark.less";
import "styles/__style.css";
import {Provider} from "react-redux";
import LanguageProvider from "./lib/providers/language-provider/LanguageProvider";
import UserProvider from "./lib/providers/user-provider/UserProvider";
import StoreProvider from "./lib/providers/store-provider/StoreProvider";
import Index from "./pages";
import {store} from "./store/store";
import BrowserSupportProvider from "./lib/providers/browser-support-provider/BrowserSupportProvider";
import ThemeProvider from "./lib/providers/theme-provider/ThemeProvider";

const App: React.FC = () => {

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            const timeout = setTimeout(() => {
                ReactGA.initialize('UA-129675719-1');
                ReactGA.pageview(window.location.pathname + window.location.search);
            })
            return () => {
                clearTimeout(timeout);
            }
        }
    }, []);

    return <BrowserSupportProvider>
        <Provider store={store}>
            <ThemeProvider>
                <LanguageProvider>
                    <UserProvider>
                        <StoreProvider>
                            <Index/>
                        </StoreProvider>
                    </UserProvider>
                </LanguageProvider>
            </ThemeProvider>
        </Provider>
    </BrowserSupportProvider>
};

export default App