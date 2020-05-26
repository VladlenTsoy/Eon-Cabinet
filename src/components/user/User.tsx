import React, {useEffect, useState} from 'react';
import {Loader} from "lib";
import {useAppContext} from "../../store/context/use-app-context";

const BlockedAccount = React.lazy(() => import("./blocked-account/BlockedAccount"));
const Student = React.lazy(() => import("./student/Student"));
const Teacher = React.lazy(() => import("./teacher/Teacher"));
const Admin = React.lazy(() => import("./admin/Admin"));
const DirectorCenter = React.lazy(() => import("./director-center/DirectorCenter"));
const DirectorFranchise = React.lazy(() => import("./director-franchise/DirectorFranchise"));

const User:React.FC = () => {
    const {user} = useAppContext();
    const [isDarkTheme, setIsDarkTheme] = useState(false);

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
        setIsDarkTheme(user?.setting?.is_dark);
    }, [user]);

    console.log(user);
    return <>
        <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
            {user.access === 'teacher' ? <Teacher/> :
                user.access === 'director-center' ? <DirectorCenter/> :
                    user.access === 'director-franchise' ? <DirectorFranchise/> :
                        user.access === 'admin' ? <Admin/> :
                            user.access === 'student' ? <Student/> :
                                <BlockedAccount/>
            }
        </React.Suspense>
        {/*{user.email_verified_at ? null : <ConfirmEmail/>}*/}
    </>;
};

export default User;