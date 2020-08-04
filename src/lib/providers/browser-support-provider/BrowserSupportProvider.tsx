import React from 'react';
import {detect} from "detect-browser";

const browser = detect();

const BrowserSupportProvider: React.FC = ({children}) => {
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
        return <>{children}</>
    else
        return <div style={{textAlign: "center", fontSize: '4vw'}}>
            Ваш браузер не поддерживается, обновите или скачайте другой!
        </div>;
};

export default BrowserSupportProvider;